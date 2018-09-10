const Big = require('big.js')

const express = require('express')
const router = express.Router()

const security = require('../security')
const parse = require('./utils/parse')

/**
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#market-data-endpoints
 */
router.get('/api/v1/depth', [
    security.NONE,
    parse.symbol,
    parse.limit(100, 1000)
], (req, res, next) => {
    req.services.market.depth(
        req.query.symbol,
        req.query.limit
    ).then((depth) => {
        res.send({
            lastUpdateId: 3,
            bids: [],
            asks: []
        })
    }).catch(next)
})

/**
 * Recent trades list.
 * 
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#recent-trades-list
 * @weight 1
 */
router.get('/api/v1/trades', [
    security.NONE,
    parse.symbol,
    parse.limit(500, 1000)
], (req, res, next) => {
    req.services.trades.lastTrades(
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
    }).catch(next)
})

module.exports = router
