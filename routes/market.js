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

module.exports = router
