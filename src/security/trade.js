const utils = require('./common')
const errors = require('../errors')

module.exports = (req, res, next) => {
    utils.handleSign(req).then((key) => {
        if (!key.canTrade) {
            throw errors.REJECTED_MBX_KEY()
        }
        req.userId = key.userId
        next()
    }).catch(next)
}
