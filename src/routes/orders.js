const express = require('express')
const router = express.Router()

const security = require('../security')
const parse = require('../middlewares/parse')

const Big = require('big.js')

function format(order, symbol) {
    if (Array.isArray(order)) {
        return order.map(o => format(o, symbol))
    } else if (order != null && typeof order === 'object') {
        return {
            symbol,
            orderId: order.id,
            clientOrderId: '1337',
            price: order.price ? Big(order.price).toFixed(8) : '0.00000000',
            origQty: Big(order.quantity).toFixed(8),
            executedQty: Big(order.executedQty).toFixed(8),
            cummulativeQuoteQty: Big(order.cummulativeQty).toFixed(8),
            status: '',
            timeInForce: 'GTC',
            type: order.type,
            side: order.side,
            stopPrice: '0.00000000',
            icebergQty: '0.00000000',
            time: order.createdAt,
            updateTime: order.updatedAt,
            isWorking: true,
        }
    }
    return order
}

/**
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#query-order-user_data
 */
router.get('/api/v3/order', [
    security.USER_DATA,
    parse.optOrderId,
    parse.optOrigClientOrderId,
    parse.orderIdOrOrigClOrdId,
], (req, res, next) => {
    /*
    req.services.orders.openOrders().then((orders) => {
        res.send(orders)
    }).catch(next)
    */
})

/**
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#current-open-orders-user_data
 */
router.get('/api/v3/openOrders', [
    security.USER_DATA,
    //parse.optSymbol,
    parse.symbol
], (req, res, next) => {
    req.services.orders.openOrders(req.userId, req.query.symbol).then((orders) => {
        res.send(format(orders, req.query.symbol))
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
        res.send(format(orders, req.query.symbol))
    }).catch(next)
})

/**
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#account-trade-list-user_data
 */
router.get('/api/v3/myTrades', [
    security.USER_DATA,
    parse.symbol
], (req, res, next) => {
    /*
    req.services.orders.trades(req.userId, req.query.symbol).then((orders) => {
        res.send(orders)
    }).catch(next)
    */
})

module.exports = router
