const Big = require('big.js')

const express = require('express')
const router = express.Router()

const parse = require('./utils/parse')

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

const rp = require('request-promise-native')

function trades(port, symbol, limit) {
    return rp({
        uri: `http://localhost:${port}/trades/last`,
        qs: {
            symbol, limit
        },
        json: true
    })
}

router.get('/api/v1/trades', [
    parse.symbol,
    parse.limit
], (req, res, next) => {
    trades(
        req.config.klines.port,
        req.query.symbol, 
        req.query.limit
    ).then((trades) => {
        res.send(trades.map(trade => ({
            id: trade.id,
            price: Big(trade.price).toFixed(req.market.quotePrecision),
            qty: Big(trade.qty).toFixed(req.market.basePrecision),
            time: trade.time,
            isBuyerMaker: trade.is_buyer_maker,
            isBestMatch: true
        })))
    }).catch((err) => {
        next(err)
    })
})

module.exports = router
