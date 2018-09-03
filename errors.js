module.exports = class APIError extends Error {
    constructor(status, code, message) {
        super()
        this.name = 'APIError'
        this.status = status
        this.code = code
        this.message = message
    }

    static MANDATORY_PARAM_EMPTY_OR_MALFORMED(param) {
        return new APIError(
            400,
            -1102,
            `Mandatory parameter '${param}' was not sent, was empty/null, or malformed`
        )
    }

    static PARAM_EMPTY(param) {
        return new APIError(
            400,
            -1105,
            `Parameter '${param}' was empty`
        )
    }

    static BAD_SYMBOL(param) {
        return new APIError(
            400,
            -1121,
            `Invalid symbol`
        )
    }

    static BAD_INTERVAL(param) {
        return new APIError(
            400,
            -1120,
            `Invalid interval`
        )
    }

    static ILLEGAL_CHARS(param) {
        return new APIError(
            400,
            -1100,
            `Illegal characters found in a parameter`
        )
    }
}
