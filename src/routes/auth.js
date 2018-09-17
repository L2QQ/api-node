const express = require('express')
const router = express.Router()

const security = require('../security')

router.get('/api/v4/auth', [
    security.NONE
], (req, res, next) => {
    req.services.account.auth(req.query.ethKey, req.query.qtumKey).then((api) => {
        res.send(api)
    }).catch(next)
})

module.exports = router
