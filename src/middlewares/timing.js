const errors = require('../errors')
const parse = require('./parse')

module.exports = (req, res, next) => {
    parse.optional()
    if (!req.timestamp) {
        return next()
    }

    const timestamp = parseInt(req.timestamp)

    const recvWindow = parseInt(req.query.recvWindow) || 5000
    const serverTime = Date.now()

    if (timestamp < (serverTime + 1000) && (serverTime - timestamp) <= recvWindow) {
        next()
    } else {
        next(new Error())
    }
}
