const express = require('express')
const router = express.Router()

const security = require('../security')
const parse = require('./utils/parse')

/**
 * Get current account information.
 * 
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#account-information-user_data
 */
router.get('/api/v3/account', [
    security.USER_DATA
], (req, res, next) => {
    req.services.account.account(req.userId).then((account) => {
        res.send(account)
    }).catch(next)
})

module.exports = router
