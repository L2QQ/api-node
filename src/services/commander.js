const rp = require('request-promise-native')

module.exports = class Commander {
    constructor(port) {
        this.port = port
    }

    config() {
        rp({
            uri: `http://localhost:${this.port}`,
            json: true
        })
    }
}
