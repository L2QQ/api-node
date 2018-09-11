const express = require('express')
const router = express.Router()

const security = require('../security')
const parse = require('./utils/parse')

/**
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#query-order-user_data
 */
router.get('/api/v3/order', [
    security.USER_DATA,
    parse.symbol,
    parse.orderIdOrClientOrderId
], (req, res) => {
    res.send({})
})

/**
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#current-open-orders-user_data
 */
router.get('/api/v3/openOrders', [
    security.USER_DATA,
    parse.optionalSymbol
], (req, res) => {
    res.send({})
})

/**
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#all-orders-user_data
 */
router.get('/api/v3/allOrders', [
    security.USER_DATA,
    parse.symbol
], (req, res) => {
    res.send({})
})

/**
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#account-trade-list-user_data
 */
router.get('/api/v3/myTrades', [
    security.USER_DATA,
    parse.symbol
], (req, res) => {
    res.send({})
})

module.exports = router
