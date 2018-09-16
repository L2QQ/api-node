const binance = require('binance')

binance.BinanceRest.prototype.preSign = function(query, callback) {
    this._setTimestamp(query)
    return this._makeRequest(query, callback, 'api/v4/presign', 'SIGNED', 'POST')
}

const rest = new binance.BinanceRest({
    key: '6YcvanPMhtFx2I0VMdU7mDaq6CXO5h04RU2MN2aekS8iTgjRBjT9QrHOOzWHvQhA',
    secret: 'MJaNpyqEo1dFAnwOIizf86nzPK82qQLegbJ3q5g7IEFIspvpQdIfBB4IBmUYxi2i'
})
rest._baseUrl = 'http://localhost:9000/'

rest.preSign({
    symbol: 'ETHUSDT',
    side: 'SELL',
    type: 'MARKET',
    quantity: '10'
}).then(console.log).catch(console.error)
