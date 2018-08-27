const express = require('express')
const app = express()

const morgan = require('morgan')
app.use(morgan('tiny'))

const info = require('./routes/info')
app.use(info)

const market = require('./routes/market')
app.use(market)

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
