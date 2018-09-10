const express = require('express')
const router = express.Router()

const security = require('../security')
const parse = require('./utils/parse')

/**
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#24hr-ticker-price-change-statistics
 */
router.get('/api/v1/ticker/24hr', [
    security.NONE
], (req, res) => {
    res.send({})
})

/**
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#symbol-price-ticker
 */
router.get('/api/v3/ticker/price', [
    security.NONE
], (req, res) => {
    res.send({})
})

/**
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#symbol-order-book-ticker
 */
router.get('/api/v3/ticker/bookTicker', [
    security.NONE
], (req, res) => {
    res.send({})
})

module.exports = router
