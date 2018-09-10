const express = require('express')
const router = express.Router()

const security = require('../security')
const parse = require('./utils/parse')

router.post('/api/v3/order', [
    security.TRADE
], (req, res) => {
    res.send({})
})

router.delete('/api/v3/order', [
    security.TRADE
], (req, res) => {
    res.send({})
})

module.exports = router
