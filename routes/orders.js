const express = require('express')
const router = express.Router()

router.get('/api/v3/openOrders', (req, res) => {
    res.send({})
})

router.get('/api/v3/allOrders', (req, res) => {
    res.send({})
})

router.get('/api/v3/myTrades', (req, res) => {
    res.send({})
})

module.exports = router
