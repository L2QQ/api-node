const express = require('express')
const router = express.Router()

const rp = require('request-promise-native')

function klines(symbol, interval, from, to, limit) {
    return rp({
        uri: 'http://localhost:9030',
        qs: {
            symbol, interval, from, to, limit
        },
        json: true
    })
}

router.get('/api/v1/klines', (req, res) => {
    Math.max(Math.min(parseInt(req.query.limit) || 500, 1000), 0)

    klines(req.query.symbol, req.query.interval).then(klines => {
        res.send(klines.map(kline => {
            return kline.concat(['0'])
        }))
        console.log(klines)
    }).catch(err => {
        throw err
    })
})

module.exports = router
