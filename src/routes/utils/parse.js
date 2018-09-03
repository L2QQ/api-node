const errors = require('../../../errors')

module.exports = {
    symbol: (req, res, next) => {
        if (req.query.symbol === undefined) {
            throw errors.MANDATORY_PARAM_EMPTY_OR_MALFORMED('symbol')
        }
        if (req.query.symbol.length === 0) {
            throw errors.PARAM_EMPTY('symbol')
        }

        req.market = req.config.marketsBySymbols[req.query.symbol]
        next()
    },
    interval: (req, res, next) => {
        if (req.query.interval === undefined) {
            throw errors.MANDATORY_PARAM_EMPTY_OR_MALFORMED('interval')
        }
        next()
    },
    limit: (req, res, next) => {

        next()
    },
    time: (param) => {
        return (req, res, next) => {
            next()
        }
    },
}
