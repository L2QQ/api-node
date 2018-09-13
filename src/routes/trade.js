const express = require('express')
const router = express.Router()

const security = require('../security')
const parse = require('../middlewares/parse')

/**
 * Send in a new order.
 * 
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#account-endpoints
 */
router.post('/api/v3/order', [
    security.TRADE,
    parse.symbol,
    parse.side,
    parse.orderType,
    parse.optTimeInForce,
    parse.quantity,
    parse.optPrice,
    parse.optNewClientOrderId,
    parse.optStopPrice,
    parse.optIcebergQty,
    parse.optNewOrderRespType,
    parse.tradeAdditionalMandatory,
    parse.optSignedMessage
], (req, res, next) => {
    const q = req.query
    switch (q.type) {
        case 'MARKET':
            req.services.trader.market(req.userId, q.symbol, q.side, q.quantity, q.newClientOrderId, q.newOrderRespType, q.signedMessage).then((resp) => {
                console.log(resp)
                res.send(resp)
            }).catch(next)
            break
        case 'LIMIT':
            req.services.trader.limit(req.userId, q.symbol, q.side, q.quantity, q.price, q.newClientOrderId, q.newOrderRespType, q.signedMessage).then((resp) => {
                console.log(resp)
                res.send(resp)
            }).catch(next)
            break
        case 'LIMIT_MAKER':
            req.services.trader.limitMaker(req.userId, q.symbol, q.side, q.quantity, q.price, q.newClientOrderId, q.newOrderRespType, q.signedMessage).then((resp) => {
                console.log(resp)
                res.send(resp)
            }).catch(next)
            break
    }
})

/**
 * Cancel an active order.
 * 
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#cancel-order-trade
 * @weight 1
 */
router.delete('/api/v3/order', [
    security.TRADE,
    parse.symbol,
    parse.optOrderId,
    parse.optOrigClientOrderId,
    parse.orderIdOrOrigClOrdId,
    parse.optNewClientOrderId
], (req, res, next) => {
    if (req.query.orderId !== undefined) {
        req.services.trader.cancelByOrderId(req.userId, req.query.symbol, req.query.orderId, req.query.newClientOrderId).then((order) => {
            res.send(order)
        }).catch(next)
    } else {
        req.services.trader.cancelByOrderId(req.userId, req.query.symbol, req.query.origClientOrderId, req.query.newClientOrderId).then((order) => {
            res.send(order)
        }).catch(next)
    }
})

module.exports = router
