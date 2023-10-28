const Joi = require('joi')
const logger = require('../middlewares/logger')
const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtHelper = require('../helpers/jwt.helper')
const debug = require("../middlewares/logger").debug
require('dotenv/config')
const Regex = {
    displayName : /^(?![- '])(?![×Þß÷þø])[- '0-9A-Za-zÀ-ÛaAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+(?<![- ']).{4,24}$/,
    email : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    password : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
}
// TOKEN VALUES
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "TERCES_NEKOT_SSECCA"
const accessTokenlife = process.env.ACCESS_TOKEN_LIFE || "30s"

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "TERCES_NEKOT_HSERFER"
const refreshTokenlife = process.env.REFRESH_TOKEN_LIFE || "24h"

const refreshTokenLists = require('../models/refreshToken.model');

const registerRule = Joi.object({
    displayName: Joi.string()
        .min(4)
        .max(24)
        .pattern(Regex.displayName)
        .required(),

    email: Joi.string()
        .pattern(Regex.email)
        .required(),

    password: Joi.string()
        .pattern(Regex.password)
        .required(),
})
const validFunction = {
    registerValidation : (register_values) =>{
        const { error } = registerRule.validate(register_values)
        if (error) return 
        return registerRule.validate(register_values)
    }
}
module.exports.register = async function(req, res){
    const { error } = registerRule.validate(req.body)
    if (error) return res.status(422).send(error.details[0].message);

    const checkNameExist = await UserModel.findOne({ displayName: req.body.displayName });
    if (checkNameExist) return res.status(422).send('TÊN NÀY ĐÃ ĐƯỢC SỬ DỤNG !');

    const checkEmailExist = await UserModel.findOne({ email: req.body.email });
    if (checkEmailExist) return res.status(422).send('EMAIL NÀY ĐÃ ĐƯỢC SỬ DỤNG !');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new UserModel({
        displayName: req.body.displayName,
        email: req.body.email,
        password: hashPassword,
    });

    try {
        const newUser = await user.save();
        await res.status(200).send(newUser);
    } catch (err) {
        res.status(400).send(err);
    }
}
module.exports.login = async function(req, res){
    try{
        const user = await UserModel.findOne({ email: req.body.email });
        console.log(user);
        if (!user) return res.status(422).send('E-mail hoặc mật khẩu không đúng');

        bcrypt.compare(req.body.password, user.password, async (error, response)=>{
            if (error){
                // handle error
            }
            if (response){
                //send JWT
                const accessToken = jwtHelper.generateToken(user, accessTokenSecret, accessTokenlife);
                const refreshToken = jwtHelper.generateToken(user, refreshTokenSecret, refreshTokenlife);
                const newRefreshToken = new refreshTokenLists({
                    refreshToken: refreshToken,
                });
                await newRefreshToken.save()
                res.cookie('AuthToken', accessToken,{
                    maxAge : 1000 * 60 * 60,
                    httpOnly : false,
                    secure : true,
                    sameSite : 'Lax' 
                })
                return res.sendStatus(200)
                
            }else{
                console.log('E-mail hoặc mật khẩu không đúng !')
                return res.status(422).send('E-mail hoặc mật khẩu không đúng !')
            }
        } );
        
    }catch(error){
        debug(`${error}`)
        res.sendStatus(500)
    }
    
}