const express = require('express')
const router = new express.Router()

router.get('', (req, res) => {
    res.send('Welcome to the Router for the TGC Software')
})

module.exports = router