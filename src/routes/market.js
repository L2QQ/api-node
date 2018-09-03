const Big = require('big.js')

const express = require('express')
const router = express.Router()

const parse = require('./utils/parse')

/**
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#market-data-endpoints
 */
router.get('/api/v1/depth', [
    parse.symbol,
    parse.limit(100, 1000)
], (req, res) => {
    // TODO: check limit
    res.send({
        lastUpdateId: 3,
        bids: [],
        asks: []
    })
})

/**
 * Recent trades list.
 * 
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#recent-trades-list
 * @weight 1
 */
router.get('/api/v1/trades', [
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
    }).catch((err) => {
        next(err)
    })
})

/**
 * Get older trades.
 * 
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#old-trade-lookup-market_data
 * @weight 5
 */
router.get('/api/v1/historyTrades', [
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
    }).catch((err) => {
        next(err)
    })
})

module.exports = router
