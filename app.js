const express = require('express')
const app = express()

const morgan = require('morgan')
app.use(morgan('tiny'))

app.use(require('./src/routes/ping'))

const rp = require('request-promise-native')

const commanderPort = parseInt(process.env.PORT) || 9040

app.config = rp({
    uri: `http://localhost:${commanderPort}`,
    json: true
}).then((config) => {
    config.marketsBySymbols = config.markets.reduce((acc, cur) => {
        acc[cur.symbol] = cur
        return acc
    }, {})

    app.services = {}
    app.services.trades = new Trades(config.klines.port)
    return config
})

const Trades = require('./src/services/trades')

app.use((req, res, next) => {
    app.config.then((config) => {
        req.config = config
        req.services = app.services
        next()
    }).catch(err => {
        next(err)
    })
})

app.use(require('./src/routes/info'))
app.use(require('./src/routes/market'))
app.use(require('./src/routes/klines'))
app.use(require('./src/routes/ticker'))

const pgp = require('pg-promise')()
app.db = pgp({
    database: 'L2QQ'
})

app.use((req, res, next) => {
    const apiKey = req.header('X-MBX-APIKEY')
    if (!apiKey) {
        console.error('Fire')
        throw Error('Need api key')
    }
    
    
    const rows = req.app.db.any('SELECT * FROM apikeys WHERE key = $1', [key])
    
    console.log(rows)

    next()
})

const trade = () => {

}

app.use(require('./src/routes/trade'))
app.use(require('./src/routes/orders'))
app.use(require('./src/routes/user'))

const APIError = require('./errors')

app.use((err, req, res, next) => {
    console.log(err)

    if (err instanceof APIError) {
        res.status(err.status).send({
            code: err.code,
            msg: err.message
        })
    }
    res.status(500).send(err.message)
})

app.listen(9000, () => {
    console.log('Listen')
})
