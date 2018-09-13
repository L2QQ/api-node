const errors = require('../errors')

function isUndefined(value) {
    return value === undefined
}

function exist(value) {
    return !isUndefined(value)
}

function isEmpty(value) {
    return value === ''
}

function mandatory(query, param, regexp) {
    if (isUndefined(query[param])) {
        throw errors.MANDATORY_PARAM_EMPTY_OR_MALFORMED(param)
    }
    if (isEmpty(query[param])) {
        throw errors.PARAM_EMPTY(param)
    }
    if (regexp) {
        if (!regexp.test(query[param])) {
            throw errors.ILLEGAL_CHARS(param, regexp.source)
        }
    }
}

function optional(query, param, regexp) {
    if (isUndefined(query[param])) {
        return false
    }
    if (isEmpty(query[param])) {
        throw errors.PARAM_EMPTY(param)
    }
    if (regexp) {
        if (!regexp.test(query[param])) {
            throw errors.ILLEGAL_CHARS(param, regexp.source)
        }
    }
    return true
}

function assertExist(query, param) {
    if (isUndefined(query[param])) {
        throw errors.MANDATORY_PARAM_EMPTY_OR_MALFORMED(param)
    }
}

function assertNotEmpty(query, param) {
    if (isEmpty(query[param])) {
        throw errors.PARAM_EMPTY(param)
    }
}

function assertRegexp(query, param, regexp) {
    if (!regexp.test(query[param])) {
        throw errors.ILLEGAL_CHARS(param, regexp.source)
    }
}

module.exports = {
    isUndefined,
    isEmpty,
    mandatory,
    optional,
    assertExist,
    assertRegexp,
    assertNotEmpty,

    interval(req, res, next) {
        mandatory(req.query, 'interval')
        if (!['1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M'].includes(req.query.interval)) {
            throw errors.BAD_INTERVAL
        }
        next()
    },

    limit(def, max) {
        return (req, res, next) => {
            if (exist(req.query.limit)) {
                mandatory(req.query, 'limit', /^[0-9]{1,20}$/)
            }
            req.query.limit = Math.min(parseInt(req.query.limit) || def, max)
            next()
        }
    },

    optTime(param) {
        return (req, res, next) => {
            next()
        }
    },

    optId(param) {
        return (req, res, next) => {
            next()
        }
    },

    symbol(req, res, next) {
        mandatory(req.query, 'symbol', /^[A-Z0-9_]{1,20}$/)
        if (!Object.keys(req.marketsBySymbols).includes(req.query.symbol)) {
            throw errors.BAD_SYMBOL
        }
        req.market = req.marketsBySymbols[req.query.symbol]
        next()
    },

    optSymbol(req, res, next) {
        if (exist(req.query.symbol)) {
            mandatory(req.query, 'symbol', /^[A-Z0-9_]{1,20}$/)
            if (!Object.keys(req.marketsBySymbols).includes(req.query.symbol)) {
                throw errors.BAD_SYMBOL
            }
            req.market = req.marketsBySymbols[req.query.symbol]
        }
        next()
    },

    side(req, res, next) {
        mandatory(req.query, 'side', /^[a-zA-Z0-9]{1,60}$/)
        if (!['SELL', 'BUY'].includes(req.query.side)) {
            throw errors.INVALID_SIDE()
        }
        next()
    },

    orderType(req, res, next) {
        mandatory(req.query, 'type', /^[a-zA-Z0-9]{1,60}$/)
        if (!['LIMIT', 'MARKET', 'LIMIT_MAKER'].includes(req.query.type)) {
            throw errors.INVALID_ORDER_TYPE()
        }
        next()
    },

    quantity(req, res, next) {
        mandatory(req.query, 'quantity', /^([0-9]{1,20})(\\.[0-9]{1,20})?$/)
        next()
    },

    optTimeInForce(req, res, next) {
        next()
    },

    optPrice(req, res, next) {
        next()
    },

    optNewClientOrderId(req, res, next) {
        optional(req.query, 'newClientOrderId', /^[a-zA-Z0-9-_]{1,36}$/)
        next()
    },

    optStopPrice(req, res, next) {
        next()
    },

    optIcebergQty(req, res, next) {
        next()
    },

    optNewOrderRespType(req, res, next) {
        if (optional(req.query, 'newOrderRespType')) {
            if (!['ACK', 'RESULT', 'FULL'].includes(req.query.newOrderRespType)) {
                throw errors.INVALID_PARAMETER()
            }
        }
        next()
    },

    optOrderId(req, res, next) {
        optional(req.query, 'orderId', /^[0-9]{1,20}$/)
        next()
    },

    optOrigClientOrderId(req, res, next) {
        optional(req.query, 'origClientOrderId', /^[a-zA-Z0-9-_]{1,36}$/)
        next()
    },

    orderIdOrOrigClOrdId(req, res, next) {
        if (!req.query.orderId && !req.query.origClientOrderId) {
            throw errors.MANDATORY_PARAM_EMPTY_OR_MALFORMED('orderId', 'origClientOrderId')
        }
        next()
    },

    tradeAdditionalMandatory(req, res, next) {
        switch (req.query.type) {
            case 'MARKET':
                break
            case 'LIMIT':
                assertExist(req.query, 'price')
                break
            case 'LIMIT_MAKER':
                assertExist(req.query, 'price')
                break
        }
    },

    timestamp(req, res, next) {
        mandatory(req.query, 'timestamp', /^[0-9]{1,20}$/)
        if (next) next()
    },

    signature(req, res, next) {
        mandatory(req.query, 'signature', /^[A-Fa-f0-9]{64}$/)
        if (next) next()
    },

    listenKey(req, res, next) {
        mandatory(req.query, 'listenKey', /^[a-zA-Z0-9]{1,60}$/)
        next()
    }
}