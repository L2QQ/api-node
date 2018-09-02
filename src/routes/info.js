const express = require('express')
const router = express.Router()

router.get('/api/v1/exchangeInfo', (req, res) => {
    res.send({
        timezone: 'UTC',
        serverTime: Date.now(),
        exchangeFilters: [],
        rateLimits: [],
        symbols: config.markets.map(market => ({
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
