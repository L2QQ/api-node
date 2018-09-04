const express = require('express')
const router = express.Router()

router.get('/api/v3/account', (req, res) => {
    res.send({})
})

router.post('/api/v1/userDataStream', (req, res) => {
    res.send({ 
        listenKey: '' 
    })
})

router.put('/api/v1/userDataStream', (req, res) => {
    res.send({})
})

router.delete('/api/v1/userDataStream', (req, res) => {
    res.send({})
})

module.exports = router
