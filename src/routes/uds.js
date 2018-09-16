const express = require('express')
const router = express.Router()

const security = require('../security')
const parse = require('../middlewares/parse')

/**
 * Start a new user data stream. The stream will close after 60 minutes unless a keepalive is sent.
 * 
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#start-user-data-stream-user_stream
 */
router.post('/api/v1/userDataStream', [
    security.USER_STREAM
], (req, res, next) => {
    req.services.uds.start(req.userId).then((listenKey) => {
        res.send({ listenKey })
    }).catch(next)
})

/**
 * Keepalive a user data stream to prevent a time out. 
 * User data streams will close after 60 minutes. 
 * It's recommended to send a ping about every 30 minutes.
 * 
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#keepalive-user-data-stream-user_stream
 */
router.put('/api/v1/userDataStream', [
    security.USER_STREAM, 
    parse.listenKey
], (req, res, next) => {
    req.services.uds.keepAlive(req.userId, req.query.listenKey).then(() => {
        res.send({})
    }).catch(next)
})

/**
 * Close out a user data stream.
 * 
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#close-user-data-stream-user_stream
 */
router.delete('/api/v1/userDataStream', [
    security.USER_STREAM, 
    parse.listenKey
], (req, res, next) => {
    req.services.uds.close(req.userId, req.query.listenKey).then(() => {
        res.send({})
    }).catch(next)
})

module.exports = router
