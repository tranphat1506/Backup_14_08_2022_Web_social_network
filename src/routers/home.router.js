const express = require('express');
const router = express.Router();
const logger = require('../middlewares/logger');
const jwtHelper = require("../helpers/jwt.helper")

router.get("/", async (req, res)=>{
    return await res.render('home', 
    {
        TITLE : "Home"
    })
})
router.get("/profile", async (req, res)=>{
    return await res.render('profile')
})
router.get("/get", async (req, res) => {
    const authorizationCookie = req.cookies.AuthToken
    try {
        const decoded = await jwtHelper.verifyToken(authorizationCookie, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({...decoded.data,...{cookie : authorizationCookie}})
    }catch(error){
        // Trường hợp gặp lỗi
        return res.sendStatus(401)
    }
})
module.exports = router;