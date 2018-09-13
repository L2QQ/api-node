const express = require('express')
const router = express.Router()

const security = require('../security')
const parse = require('../middlewares/parse')

/**
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#query-order-user_data
 */
router.get('/api/v3/order', [
    security.USER_DATA,
    parse.optOrderId,
    parse.optOrigClientOrderId,
    parse.orderIdOrOrigClOrdId,
], (req, res, next) => {
    req.services.orders.openOrders().then((orders) => {
        res.send(orders)
    }).catch(next)
})

/**
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#current-open-orders-user_data
 */
router.get('/api/v3/openOrders', [
    security.USER_DATA,
    parse.optSymbol
], (req, res, next) => {
    req.services.orders.openOrders(req.userId, req.query.symbol).then((orders) => {
        res.send(orders)
    }).catch(next)
})

/**
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#all-orders-user_data
 */
router.get('/api/v3/allOrders', [
    security.USER_DATA,
    parse.symbol
], (req, res, next) => {
    req.services.orders.allOrders(req.userId, req.query.symbol).then((orders) => {
        res.send(orders)
    }).catch(next)
})

/**
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#account-trade-list-user_data
 */
router.get('/api/v3/myTrades', [
    security.USER_DATA,
    parse.symbol
], (req, res, next) => {
    req.services.orders.trades(req.userId, req.query.symbol).then((orders) => {
        res.send(orders)
    }).catch(next)
})

module.exports = router
