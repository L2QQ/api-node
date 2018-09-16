require('colors')
console.log('🤖 REST API'.bold)
if (process.env.NODE_ENV === 'production') {
    console.log('In production'.bold.cyan)
}

const express = require('express')
const app = express()

app.services = {}

const services = require('../services-node/src/wrappers')
const commander = new services.Commander(parseInt(process.env.COMMANDER_PORT) || 9040)
commander.on('config', (config) => {
    console.log('Commander config updated')
    console.log('Update services wrappers')

    app.services.account = new services.Account(config.services.account.port)
    app.services.apikeys = new services.APIKeys(config.services.apikeys.port)
    app.services.market = new services.Market(config.services.market.port)
    app.services.ohlcv = new services.OHLCV(config.services.ohlcv.port)
    app.services.orders = new services.Orders(config.services.orders.port)
    app.services.ticker = new services.Ticker(config.services.ticker.port)
    app.services.trader = new services.Trader(config.services.trader.port)
    app.services.trades = new services.Trades(config.services.trades.port)
    app.services.uds = new services.UDS(config.services.uds.port)

    marketsBySymbols = config.markets.reduce((acc, cur) => {
        acc[cur.symbol] = cur
        return acc
    }, {})
})

const morgan = require('morgan')
if (process.env.NODE_ENV === 'production') {
    app.use(morgan('tiny'))
} else {
    app.use(morgan('dev'))
}

app.use((req, res, next) => {
    commander.config().then((config) => {
        req.config = config
        req.services = app.services
        req.marketsBySymbols = marketsBySymbols
        req.config.marketsBySymbols = marketsBySymbols
        next()
    }).catch(err => {
        next(err)
    })
})

app.use(require('./src/middlewares/timing'))

app.use(require('./src/routes/ping'))
app.use(require('./src/routes/info'))
app.use(require('./src/routes/market'))
app.use(require('./src/routes/ticker'))
app.use(require('./src/routes/klines'))
app.use(require('./src/routes/trade'))
app.use(require('./src/routes/trade'))
app.use(require('./src/routes/orders'))
app.use(require('./src/routes/user'))
app.use(require('./src/routes/uds'))

app.use((req, res) => {
    res.set('Content-Type', 'text/plain').status(404).send("🤖 L2QQ REST API")
})

app.use(require('./src/middlewares/errors'))

commander.once('config', () => {
    const server = require('http').createServer(app)
    const port = parseInt(process.env.PORT) || 9000
    server.listen(port, () => {
        console.log(`Listening on: ${server.address().port}`.green.bold)
    })

    process.on('SIGINT', () => {
        console.log('SIGINT signal received'.red.bold)
        server.close((err) => {
            if (err) {
                console.error(err)
                process.exit(1)
            }
            process.exit(0)
        })
    })
})
