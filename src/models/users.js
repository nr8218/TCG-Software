const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    username: {
    type: String,
    required: true,
    trim: true,
    unique: true
},
email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
        if (!validator.isEmail(value)) {
            throw new Error('Email is not valid')
        }
    }
}, 
name: {
            type: String,
            required: true,
            trim: true
        },
password: {
    type: String
}
})

const User = mongoose.model('User', userSchema)

 module.exports = User
