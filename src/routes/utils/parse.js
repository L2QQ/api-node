const errors = require('../../errors')

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

    optionalSymbol: (req, res, next) => {
        next()
    },

    orderIdOrClientOrderId: (req, res, next) => {
        next()
    },

    interval: (req, res, next) => {
        if (req.query.interval === undefined) {
            throw errors.MANDATORY_PARAM_EMPTY_OR_MALFORMED('interval')
        }
        next()
    },

    limit: (def, max) => {
        return (req, res, next) => {
            next()
        }
    },

    time: (param) => {
        return (req, res, next) => {
            next()
        }
    },

    optionalId: (param) => {
        return (req, res, next) => {
            next()
        }
    },

    listenKey: (req, res, next) => {
        next()
    }, 

    orderType: (req, res, next) => {
        if (req.query.type === undefined) {
            throw errors.MANDATORY_PARAM_EMPTY_OR_MALFORMED('type')
        }
        if (req.query.type.length === '') {
            throw errors.PARAM_EMPTY('type')
        }
        if (!['MARKET', 'LIMIT'].includes(req.query.type)) {

        }
        
        next()
    }, 

    orderSide: (req, res, next) => {
        next()
    },

    optionalTimeInForce: (req, res, next) => {
        next()
    }, 

    quantity: (req, res, next) => {
        next()
    }, 

    optionalPrice: (req, res, next) => {
        next()
    }, 

    optionalClientOrderId: (req, res, next) => {
        next()
    }, 

    newOrderRespType: (req, res, next) => {
        next()
    }
}
