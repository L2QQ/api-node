const express = require('express')
const router = express.Router()

const security = require('../security')
const parse = require('../middlewares/parse')

const Big = require('big.js')

function format(trade) {
    if (Array.isArray(trade)) {
        return trade.map(format)
    } else if (trade != null && typeof trade === 'object') {
        return {
            id: trade.id,
            price: Big(trade.price).toFixed(8),
            qty: Big(trade.quantity).toFixed(8),
            time: trade.createdAt,
            isBuyerMaker: trade.isBuyerMaker,
            isBestMatch: true
        }
    }
    return trade
}

/**
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#market-data-endpoints
 */
router.get('/api/v1/depth', [
    security.NONE,
    parse.symbol,
    parse.limit(5, 1000)
], (req, res, next) => {
    function formatLevel(level) {
        return [
            Big(level[0]).toFixed(req.market.quotePrecision),
            Big(level[1]).toFixed(req.market.basePrecision),
            []
        ]
    }

    req.services.market.depth(
        req.query.symbol,
        req.query.limit
    ).then((depth) => {
        res.send({
            lastUpdateId: depth.lastUpdateId,
            bids: depth.bids.map(formatLevel),
            asks: depth.asks.map(formatLevel)
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
    req.services.market.trades(
        req.query.symbol,
        req.query.limit
    ).then((trades) => {
        res.send(format(trades))
    }).catch(next)
})

/**
 * Get older trades.
 * 
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#old-trade-lookup-market_data
 * @weight 5
 */
router.get('/api/v1/historicalTrades', [
    security.MARKET_DATA,
    parse.symbol,
    parse.limit(500, 1000),
    parse.optId('fromId')
], (req, res, next) => {
    req.services.trades.trades(
        req.query.symbol,
        req.query.limit,
        req.query.fromId
    ).then((trades) => {
        res.send(format(trades))
    }).catch(next)
})

module.exports = router
