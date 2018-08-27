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
}
