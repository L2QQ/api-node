const express = require('express')
const router = express.Router()

const sequrity = require('../security')
const parse = require('../middlewares/parse')
const format = require('./utils/format')

/**
 * Get older trades.
 * 
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#old-trade-lookup-market_data
 * @weight 5
 */
router.get('/api/v1/historicalTrades', [
    sequrity.MARKET_DATA,
    parse.symbol,
    parse.limit(500, 1000),
    parse.optId('fromId')
], (req, res, next) => {
    req.services.trades.trades(
        req.query.symbol,
        req.query.limit,
        req.query.fromId
    ).then((trades) => {
        res.send(trades.map(format.trade(req.market)))
    }).catch(next)
})

module.exports = router
