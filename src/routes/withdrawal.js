const express = require('express')
const router = express.Router()

const security = require('../security')
const parse = require('../middlewares/parse')

router.post('/wapi/v3/withdraw.html', [
    security.USER_DATA
], (req, res, next) => {
    res.send({})
})

router.get('/wapi/v3/depositHistory.html', [
    security.USER_DATA
], (req, res, next) => {
    res.send({})
})

router.get('/wapi/v3/withdrawHistory.html', [
    security.USER_DATA
], (req, res, next) => {
    res.send({})
})

router.get('/wapi/v3/depositAddress.html', [
    security.USER_DATA
], (req, res, next) => {
    res.send({})
})

router.get('/wapi/v3/accountStatus.html', [
    security.USER_DATA
], (req, res, next) => {
    res.send({})
})

router.get('/wapi/v3/systemStatus.html', [
    security.NONE
], (req, res, next) => {
    res.send({})
})

router.get('/wapi/v3/userAssetDribbletLog.html', [
    security.USER_DATA
], (req, res, next) => {
    res.send({})
})

router.get('/wapi/v3/tradeFee.html', [
    security.USER_DATA
], (req, res, next) => {
    res.send({})
})

router.get('/wapi/v3/assetDetail.html', [
    security.USER_DATA
], (req, res, next) => {
    res.send({})
})

module.exports = router
