const express = require('express');
const router = express.Router();
const jwtHelper = require('../helpers/jwt.helper')
const logger = require('../middlewares/logger');
const controller = require('../controllers/auth.controller')
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "TERCES_NEKOT_SSECCA"

router.get("/", async (req, res)=>{
    const authorizationCookie = req.cookies.AuthToken
    if (authorizationCookie){
        try {
            const decoded = await jwtHelper.verifyToken(authorizationCookie, accessTokenSecret);
            return res.redirect('/')
        }catch(error){
            // Trường hợp gặp lỗi
            return res.render('account_form')
        }
    }
    else{
        // Không tìm thấy token trong request
        //return res.status(403).send({message : 'No token provided.'})
        return res.render('account_form')
    }
})

router.post('/login', controller.login)
router.post('/register', controller.register)

module.exports = router;