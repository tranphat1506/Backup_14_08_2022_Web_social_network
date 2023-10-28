const mongoose = require('mongoose')
// const URL = 'mongodb+srv://mongo-user:<password>@cluster-mongo-test.ieqay.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
require('dotenv/config')

const connectDB = () => {
	return new Promise( async (resolve, reject) =>{
		mongoose.connect( process.env.DB_CONNECTION,
			{ 
				useNewUrlParser: true,
				useUnifiedTopology: true 
			},
			(error) => {
				if (!error) return resolve("Database connect successfully !")
				reject(error)
			})
	})
}
module.exports = connectDB;