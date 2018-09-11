const utils = require('./utils')

module.exports = (req, res, next) => {
    utils.handleSign(req).then((key) => {
        req.userId = key.userId
        next()
    }).catch(next)
}
