const utils = require('./utils')
const errors = require('../errors')

module.exports = (req, res, next) => {
    const apiKey = utils.parseAPIKey(req)
    req.services.apikeys.keyByAPIKey(apiKey).then((key) => {
        if (!key) {
            throw errors.REJECTED_MBX_KEY()
        }
        req.userId = key.userId
        next()
    }).catch(next)
}
