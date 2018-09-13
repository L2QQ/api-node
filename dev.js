const binance = require('binance')
const rest = new binance.BinanceRest({
    key: '6YcvanPMhtFx2I0VMdU7mDaq6CXO5h04RU2MN2aekS8iTgjRBjT9QrHOOzWHvQhA',
    secret: 'MJaNpyqEo1dFAnwOIizf86nzPK82qQLegbJ3q5g7IEFIspvpQdIfBB4IBmUYxi2i'
})
rest._baseUrl = 'http://localhost:9000/'

function account() {
    rest.account().then((res) => {
        console.log(res)
    }).catch((err) => {
        console.error(err)
    })
}

function exchangeInfo() {
    rest.exchangeInfo().then((res) => {
        console.log(res)
    }).catch((err) => {
        console.error(err)
    })
}

function pingAndTime() {
    rest.ping().then((res) => {
        console.log(res)
    }).catch((err) => {
        console.error(err)
    })

    rest.time().then((res) => {
        console.log(res)
    }).catch((err) => {
        console.error(err)
    })
}

function depth() {
    rest.depth('ETHUSDT').then((res) => {
        console.log(res)
    }).catch((err) => {
        console.error(err)
    })
    
}

function trades() {
    rest.trades('ETHUSDT').then((res) => {
        console.log(res)
    }).catch((err) => {
        console.error(err)
    })
}

function newOrder() {
    rest.newOrder({
        symbol: 'ETHUSDT',
        type: 'LIMIT_MAKER',
        side: 'SELL',
        price: '20',
        quantity: '0.5'
    }).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.error(err)
    })
}
