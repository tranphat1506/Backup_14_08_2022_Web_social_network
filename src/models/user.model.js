const mongoose = require('mongoose')
const { Schema } = mongoose
const UserSchema = Schema({
    displayName: {
        type: String,
        required : true,
        min : 4,
        max : 24
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 225
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255 
    },
    age : {
        type: Number,
        default : 0,
    },
    gender : {
        type: Number,
        default : 0, // Ẩn = 0 , Nam = 1, Nữ = 2 , Khác = 3
    }
    ,
    isVerify : {
        type: Boolean,
        default : false
    },
    dateRegister : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('User', UserSchema, 'Users');