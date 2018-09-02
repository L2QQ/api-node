const express = require('express')
const router = express.Router()

router.get('/api/v3/account', (req, res) => {
    res.send({})
})

module.exports = router
