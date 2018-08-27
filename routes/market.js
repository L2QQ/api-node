const express = require('express')
const router = express.Router()

const errors = require('../errors')

router.get('/api/v1/depth', (req, res) => {
    if (req.query.symbol === undefined) {
        throw errors.MANDATORY_PARAM_EMPTY_OR_MALFORMED('symbol')
    }
    if (req.query.symbol.length === 0) {
        throw errors.PARAM_EMPTY('symbol')
    }

    res.send({
        lastUpdateId: 3,
        bids: [],
        asks: []
    })
})

router.get('/api/v1/trades', (req, res) => {
    res.send([
        {
            "id": 28457,
            "price": "4.00000100",
            "qty": "12.00000000",
            "time": 1499865549590,
            "isBuyerMaker": true,
            "isBestMatch": true
        }
    ])
})

module.exports = router
