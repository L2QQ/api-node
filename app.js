const express = require('express')
const app = express()

const morgan = require('morgan')
app.use(morgan('tiny'))

app.use(require('./routes/info'))
app.use(require('./routes/market'))
app.use(require('./routes/klines'))
app.use(require('./routes/ticker'))

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

app.use(require('./routes/trade'))
app.use(require('./routes/orders'))
app.use(require('./routes/user'))

const APIError = require('./errors')

app.use((err, req, res, next) => {
    if (err instanceof APIError) {
        res.status(err.status).send({
            code: err.code,
            msg: err.message
        })
    }
    res.status(500).send(err)
})

app.listen(9000, () => {
    console.log('Listen')
})
