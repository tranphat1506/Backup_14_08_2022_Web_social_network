const express = require("express")
require('dotenv/config')
const PORT = process.env.MAIN_SERVER_PORT || 80
const HOST = process.env.BASE_URL || 'http://127.0.0.1'
const bodyParser = require('body-parser')
const app = express();
const http = require("http")
const server = http.createServer(app)
global._SERVER = server
const SocketServices = require('./src/services/socket.io.services')
const routers = require('./src/routers/routers')

const Database = require("./src/configs/database")

const helmet = require('helmet') // Sercurity
const cors = require('cors') // Sercurity

const logger = require("./src/middlewares/logger")
const morgan = require('morgan')
const accessLogStream = require("./src/middlewares/accessLogger")

//INIT NODEJS
app.disable('X-powered-by')
app.use(express.static(__dirname + "/public"));
app.use(morgan('myformat', {stream : accessLogStream}))
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cors());
app.use(helmet())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// port
server.listen(PORT, ()=>{
    logger.info(`SERVER IS LISTENING ON ${process.env.BASE_URL} PORT ${PORT}`)
    console.log(server.address());
})
// connect database
const connectDB = async () => {
    try{
        const status = await Database()
        logger.info(status);
    } catch(error){
        logger.error(error)
    }
};  connectDB()

// Router
app.use('/', routers);
    

