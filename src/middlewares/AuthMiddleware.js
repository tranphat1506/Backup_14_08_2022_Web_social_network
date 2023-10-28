const jwtHelper = require('../helpers/jwt.helper')
const debug = require("../middlewares/logger").debug
require('dotenv/config')

// SECRET CODE
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "TERCES_NEKOT_SSECCA"
let isAuth = async (req, res, next) =>{
    const authorizationCookie = req.cookies.AuthToken
    if (authorizationCookie){
        try {
            const decoded = await jwtHelper.verifyToken(authorizationCookie, accessTokenSecret);
            next()
        }catch(error){
            // Trường hợp gặp lỗi
            debug("Error while verify token: ",error);
            return res.redirect('../account')
        }
    }
    else{
        // Không tìm thấy token trong request
        //return res.status(403).send({message : 'No token provided.'})
        return res.redirect('../account')
    }
}
module.exports = {
    isAuth : isAuth
}