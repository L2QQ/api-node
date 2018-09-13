const express = require('express')
const router = express.Router()

const security = require('../security')

/**
 * Current exchange trading rules and symbol information
 * 
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#exchange-information
 * @weight 1
 */
router.get('/api/v1/exchangeInfo', [
    security.NONE
], (req, res) => {
    res.send({
        timezone: 'UTC',
        serverTime: Date.now(),
        exchangeFilters: [],
        rateLimits: req.config.rateLimits,
        symbols: req.config.markets.map(market => ({
            symbol: market.symbol,
            status: 'TRADING',
            baseAsset: market.base,
            baseAssetPrecision: 8,
            quoteAsset: market.quote,
            quotePrecision: 8,
            orderTypes: market.orderTypes,
            icebergAllowed: true,
            filters: market.filters
        }))
    })
})

module.exports = router
