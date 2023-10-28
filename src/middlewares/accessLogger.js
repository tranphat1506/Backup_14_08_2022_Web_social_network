const morgan = require('morgan')
const moment = require('moment')
const clc = require('cli-color')
const rfs = require('rotating-file-stream')
const path = require('path')

morgan.token('date', (req, res) => {
	moment.locale('vi')
	let date = moment()
		.format('llll')
	return date
})
/* morgan.token('url', (req, res) => {
	return clc.magentaBright(req.url)
})
morgan.token('status', (req, res) => {
	if (res.statusCode < 400) {
		return clc.greenBright(res.statusCode) + " | " + clc.bgGreenBright.whiteBright(` ${res.statusMessage} `) + " | ";
	} else return clc.red(res.statusCode) + " | " + clc.bgRedBright.whiteBright(` ${res.statusMessage} `) + " | ";
	
})
morgan.token('method', (req, res) => {
	const method = String(req.method)
	switch (method) {
	case 'GET':
		return clc.yellowBright(method)
	case 'POST':
		return clc.greenBright(method)
	case 'DELETE':
		return clc.redBright(method)
	default:
		return method
	}
}) */
const accessLogStream = rfs.createStream('access.log', {
	interval: '1d', // rotate daily
	path: path.join(__dirname, '..','..', 'logs')
})
morgan.format('myformat', '[:date] | :remote-addr | :remote-user | :method :url HTTP/:http-version | :status :res[content-length]') 
module.exports = accessLogStream
