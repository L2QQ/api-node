const Big = require('big.js')

const express = require('express')
const router = express.Router()

const security = require('../security')
const parse = require('../middlewares/parse')

/**
 * Get current account information.
 * 
 * @binance https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#account-information-user_data
 */
router.get('/api/v3/account', [
    security.USER_DATA
], (req, res, next) => {
    req.services.account.account(req.userId).then((account) => {
        account.balances = account.balances.map(b => ({
            asset: b.asset,
            free: Big(b.free).toFixed(8),
            locked: Big(b.locked).toFixed(8)
        }))
        res.send(account)
    }).catch(next)
})

router.post('/api/v4/account/address', [
    security.USER_DATA,
    parse.blockchain,
    parse.address
], (req, res, next) => {
    req.services.account.saveAddress(req.userId, req.query.blockchain, req.query.address).then(() => {
        res.send({})
    }).catch(next)
})

module.exports = router
