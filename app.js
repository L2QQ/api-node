require('colors')
console.log('🤖 REST API'.bold)

const express = require('express')
const app = express()

const morgan = require('morgan')
app.use(morgan('tiny'))

app.use(require('./src/routes/ping'))

app.services = {}

const Commander = require('../commander-node/src/services/wrappers/commander')
const commander = new Commander(parseInt(process.env.COMMANDER_PORT) || 9040)
commander.on('config', (config) => {
    console.log('Config changed'.magenta)


    /*
    config.marketsBySymbols = config.markets.reduce((acc, cur) => {
        acc[cur.symbol] = cur
        return acc
    }, {})

    app.services = {}
    app.services.trades = new Trades(config.klines.port)
    */
})

app.use((req, res, next) => {
    commander.config().then((config) => {
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
//app.use(require('./src/security'))
app.use(require('./src/routes/trade'))
app.use(require('./src/routes/orders'))
app.use(require('./src/routes/user'))

const APIError = require('./src/errors')

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

commander.once('config', () => {
    console.log('Took config once'.red)
    const port = parseInt(process.env.PORT) || 9000
    app.listen(port, () => {
        console.log('Listening on:', String(port).green)
    })
})
