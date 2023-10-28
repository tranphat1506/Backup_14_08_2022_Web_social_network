const mongoose = require('mongoose')
const { Schema } = mongoose
const TokenSchema = Schema({
    refreshToken: {
        type: String,
        required : true,
    }
})

module.exports = mongoose.model('RefreshToken', TokenSchema, 'RefreshTokens');