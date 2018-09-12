const binance = require('binance')
const api = new binance.BinanceRest({
    key: '',
    secret: ''
})
api._baseUrl = 'http://localhost:9000/'

api.account().then((acc) => {
    console.log(acc)
}).catch((err) => {
    console.error(err)
})
