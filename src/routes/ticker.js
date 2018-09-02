const express = require('express')
const router = express.Router()

router.get('/api/v1/ticker/24hr', (req, res) => {
    res.send({})
})

router.get('/api/v3/ticker/price', (req, res) => {
    res.send({})
})

router.get('/api/v3/ticker/bookTicker', (req, res) => {
    res.send({})
})

module.exports = router
