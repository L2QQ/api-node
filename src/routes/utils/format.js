const Big = require('big.js')

module.exports = {
    trade: (market) => {
        return (trade) => {
            return {
                id: trade.id,
                price: Big(trade.price).toFixed(market.quotePrecision),
                qty: Big(trade.quantity).toFixed(market.basePrecision),
                time: trade.time,
                isBuyerMaker: trade.isBuyerMaker,
                isBestMatch: true
            }
        }
    }
}
