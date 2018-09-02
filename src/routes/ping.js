const express = require('express')
const router = express.Router()

router.get('/api/v1/ping', (req, res) => {
    res.send({})
})

router.get('/api/v1/time', (req, res) => {
    res.send({
        serverTime: Date.now()
    })
})

module.exports = router
