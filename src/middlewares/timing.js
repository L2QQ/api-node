const errors = require('../errors')
const parse = require('./parse')

module.exports = (req, res, next) => {
    if (!parse.exist(req.query.timestamp)) {
        return next()
    }

    parse.timestamp(req)
    const timestamp = parseInt(req.query.timestamp)
    parse.optRecvWindow(req)
    const recvWindow = parseInt(req.query.recvWindow) || 5000
    const serverTime = Date.now()

    if (timestamp >= (serverTime + 1000)) {
        next(errors.INVALID_TIMESTAMP(true))
    }
    if ((serverTime - timestamp) > recvWindow) {
        next(errors.INVALID_TIMESTAMP(false))
    }

    next()
}
