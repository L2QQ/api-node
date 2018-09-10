const express = require('express')
const router = express.Router()

const security = require('../security')
const parse = require('./utils/parse')

router.get('/api/v1/exchangeInfo', [
    security.NONE
], (req, res) => {
    res.send({
        timezone: 'UTC',
        serverTime: Date.now(),
        exchangeFilters: [],
        rateLimits: [
            {
                rateLimitType: 'REQUEST_WEIGHT',
                interval: 'MINUTE',
                limit: 1200
            },
            {
                rateLimitType: 'ORDERS',
                interval: 'SECOND',
                limit: 10
            },
            {
                rateLimitType: 'ORDERS',
                interval: 'DAY',
                limit: 100000
            }
        ],
        symbols: req.config.markets.map(market => ({
            symbol: market.symbol,
            status: 'TRADING',
            baseAsset: market.base,
            baseAssetPrecision: 8,
            quoteAsset: market.quote,
            quotePrecision: 8,
            orderTypes: [],
            icebergAllowed: true,
            filters: []
        }))
    })
})

module.exports = router
