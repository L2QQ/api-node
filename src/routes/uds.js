const express = require('express')
const router = express.Router()

const security = require('../security')
const parse = require('./utils/parse')

router.post('/api/v1/userDataStream', [
    security.USER_STREAM
], (req, res, next) => {
    req.services.uds.createListenKey(req.userId).then((listenKey) => {
        res.send({ listenKey })
    }).catch(next)
})

router.put('/api/v1/userDataStream', [
    security.USER_STREAM, 
    parse.listenKey
], (req, res) => {
    req.services.uds.keepAliveListenKey(req.userId, req.query.listenKey).then(() => {
        res.send({})
    }).catch(next)
})

router.delete('/api/v1/userDataStream', [
    security.USER_STREAM, 
    parse.listenKey
], (req, res) => {
    req.services.uds.closeListenKey(req.userId, req.query.listenKey).then(() => {
        res.send({})
    }).catch(next)
})

module.exports = router
