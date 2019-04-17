const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

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
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
        if(value.toLowerCase().includes('password')){
            throw new Error('Password can not contain "password"')
        }
    }
}
})

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username })
    if(!username) {
        throw new Error("unable to login, please check username or password.")
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('unable to login, please check username or password.')
    }

    return user
}

//hash the save password
userSchema.pre('save', async function (next) {
    const user = this 

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

 module.exports = User
