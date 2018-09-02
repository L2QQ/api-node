const Big = require('big.js')

const express = require('express')
const router = express.Router()

const rp = require('request-promise-native')

function bars(port, symbol, interval, from, to, limit) {
    return rp({
        uri: `http://localhost:${port}/ohlc`,
        qs: {
            symbol, interval, from, to, limit
        },
        json: true
    })
}

router.get('/api/v1/klines', (req, res, next) => {
    

    Math.max(Math.min(parseInt(req.query.limit) || 500, 1000), 0)

    bars(req.config.klines.port, req.query.symbol, req.query.interval).then((bars) => {
        bars.forEach((bar) => {
            bar[1] = Big(bar[1]).toFixed(8)
            bar[2] = Big(bar[2]).toFixed(8)
            bar[3] = Big(bar[3]).toFixed(8)
            bar[4] = Big(bar[4]).toFixed(8)
            bar[5] = Big(bar[5]).toFixed(8)
            bar[6] = Big(bar[6]).toFixed(8)
        })
        res.send(bars)
    }).catch((err) => {
        // TODO: wrap error
        next(err)
    })
})

module.exports = router
