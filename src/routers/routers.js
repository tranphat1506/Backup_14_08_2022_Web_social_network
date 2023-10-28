const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const authMiddleware = require('../middlewares/AuthMiddleware')
const jwtHelper = require("../helpers/jwt.helper")
const SocketServices = require('../services/socket.io.services')

require('dotenv/config')
const cookieParser = require('cookie-parser')

router.use(cookieParser())
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())
// AUTH ROUTER
const ROUTER_auth = require('./auth.router')
router.use('/account', ROUTER_auth)

router.use(authMiddleware.isAuth)
// HOME ROUTER 
const ROUTER_home = require('./home.router') 
router.use('/', ROUTER_home)

router.get('/chat', async function (req, res) {
   return res.render('index');
});
// Socket Services
let StrangerChat_Services = new SocketServices(_SERVER,"/chat")
StrangerChat_Services.StrangerChat()// Chat with stranger 
module.exports = router;

