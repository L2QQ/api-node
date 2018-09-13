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
    parse.optNewOrderRespType
], (req, res) => {
    res.send({})
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
    parse.optNewClientOrderId
], (req, res) => {
    res.send({})
})

module.exports = router
