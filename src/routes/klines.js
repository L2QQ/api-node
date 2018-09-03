const Big = require('big.js')

const express = require('express')
const router = express.Router()

const parse = require('./utils/parse')

/**
 * Kline/candlestick bars for a symbol. Klines are uniquely identified by their open time.
 * 
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#klinecandlestick-data
 * @weight 1
 */
router.get('/api/v1/klines', [
    parse.symbol,
    parse.interval,
    parse.time('startTime'),
    parse.time('endTime'),
    parse.limit(500, 1000)
], (req, res, next) => {
    req.services.trades.bars(
        req.query.symbol,
        req.query.interval,
        req.query.startTime,
        req.query.endTime,
        req.query.limit
    ).then((bars) => {
        bars.forEach((bar) => {
            bar[1] = Big(bar[1]).toFixed(req.market.quotePrecision)
            bar[2] = Big(bar[2]).toFixed(req.market.quotePrecision)
            bar[3] = Big(bar[3]).toFixed(req.market.quotePrecision)
            bar[4] = Big(bar[4]).toFixed(req.market.quotePrecision)
            bar[5] = Big(bar[5]).toFixed(req.market.basePrecision)
            bar[6] = Big(bar[6]).toFixed(req.market.quotePrecision)
        })
        res.send(bars)
    }).catch((err) => {
        // TODO: wrap error
        next(err)
    })
})

module.exports = router
