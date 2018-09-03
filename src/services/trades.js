const rp = require('request-promise-native')

module.exports = class Trades {
    constructor(port) {
        this.port = port
    }

    bars(symbol, interval, from, to, limit) {
        return rp({
            uri: `http://localhost:${this.port}/ohlc`,
            qs: { symbol, interval, from, to, limit },
            json: true
        })
    }

    lastTrades() {

    }

    historyTrades() {

    }
}
