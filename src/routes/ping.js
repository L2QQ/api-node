const express = require('express')
const router = express.Router()

/**
 * Test connectivity to the Rest API.
 * 
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#test-connectivity
 * @weight 1
 */
router.get('/api/v1/ping', (req, res) => {
    res.send({})
})

/**
 * Test connectivity to the Rest API and get the current server time.
 * 
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#check-server-time
 * @weight 1
 */
router.get('/api/v1/time', (req, res) => {
    res.send({
        serverTime: Date.now()
    })
})

module.exports = router
