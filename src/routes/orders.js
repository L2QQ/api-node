const express = require('express')
const router = express.Router()

const security = require('../security')
const parse = require('./utils/parse')

router.get('/api/v3/order', [
    security.USER_DATA
], (req, res) => {
    res.send({})
})

router.get('/api/v3/openOrders', [
    security.USER_DATA
], (req, res) => {
    res.send({})
})

router.get('/api/v3/allOrders', [
    security.USER_DATA
], (req, res) => {
    res.send({})
})

router.get('/api/v3/myTrades', [
    security.USER_DATA
], (req, res) => {
    res.send({})
})

module.exports = router
