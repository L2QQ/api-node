const Big = require('big.js')

const express = require('express')
const router = express.Router()

const sequrity = require('../security')
const parse = require('./utils/parse')

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
    parse.optionalId('fromId')
], (req, res, next) => {
    req.services.trades.historyTrades(
        req.query.symbol,
        req.query.limit,
        req.query.fromId
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
