const express = require('express')
const router = express.Router()

const security = require('../security')
const parse = require('../middlewares/parse')

/**
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#24hr-ticker-price-change-statistics
 */
router.get('/api/v1/ticker/24hr', [
    security.NONE,
    parse.optSymbol
], (req, res, next) => {
    res.send({})
})

/**
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#symbol-price-ticker
 */
router.get('/api/v3/ticker/price', [
    security.NONE,
    parse.optSymbol
], (req, res, next) => {
    if (req.symbol) {
        req.services.market.priceTicker(req.symbol).then(t => res.send(t)).catch(next)
    } else {
        req.services.market.priceTickers().then(t => res.send(t)).catch(next)
    }
})

/**
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#symbol-order-book-ticker
 */
router.get('/api/v3/ticker/bookTicker', [
    security.NONE,
    parse.optSymbol
], (req, res, next) => {
    if (req.symbol) {
        req.services.market.bookTicker(req.symbol).then(t => res.send(t)).catch(next)
    } else {
        req.services.market.bookTickers().then(t => res.send(t)).catch(next)
    }
})

module.exports = router
