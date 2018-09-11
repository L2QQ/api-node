const crypto = require('crypto')
const errors = require('../errors')

function parseAPIKey(req) {
    const apiKey = req.header('X-MBX-APIKEY')
    if (!apiKey) {
        throw errors.BAD_API_KEY_FMT()
    }
    if (!/^[A-Za-z\d]{64}$/.test(apiKey)) {
        throw errors.BAD_API_KEY_FMT()
    }
    return apiKey
}

function parseTimestamp(req) {
    if (req.query.timestamp == null) {
        throw errors.MANDATORY_PARAM_EMPTY_OR_MALFORMED('timestamp')
    }
    if (req.query.timestamp == '') {
        throw errors.PARAM_EMPTY('timestamp')
    }
    if (!/^[0-9]{1,20}$/.test(req.query.timestamp)) {
        throw errors.ILLEGAL_CHARS('timestamp', '^[0-9]{1,20}$')
    }
    return req.query.timestamp
}

function parseSignature(req) {
    if (req.query.signature == null) {
        throw errors.MANDATORY_PARAM_EMPTY_OR_MALFORMED('signature')
    }
    if (req.query.signature == '') {
        throw errors.PARAM_EMPTY('signature')
    }
    if (!/^[A-Fa-f0-9]{64}$/.test(req.query.signature)) {
        throw errors.ILLEGAL_CHARS('signature', '^[A-Fa-f0-9]{64}$')
    }
    return req.query.signature
}

function handleSign(req) {
    return new Promise((resolve, reject) => {
        const apiKey = parseAPIKey(req)
        const timestamp = parseTimestamp(req)
        const signature = parseSignature(req)

        req.services.apikeys.keyByAPIKey(apiKey).then((key) => {
            if (!key) {
                throw errors.REJECTED_MBX_KEY()
            }

            delete req.query.signature
            const query = Object.entries(req.query).map(p => p[0] + '=' + p[1]).join('&')

            const hmac = crypto.createHmac('sha256', key.secret)
            hmac.update(query)
            const check = hmac.digest('hex')

            if (signature !== check) {
                throw errors.REJECTED_MBX_KEY()
            }

            resolve(key)
        })
    })
}

module.exports = {
    parseAPIKey,
    parseTimestamp,
    parseSignature,
    handleSign
}
