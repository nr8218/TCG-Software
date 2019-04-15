const express = require('express')
//const User = require('../models/users')
const router = new express.Router()


router.get('/users', (req, res) => {
    res.send("Welcome to the Users Home page")
})

module.exports = router