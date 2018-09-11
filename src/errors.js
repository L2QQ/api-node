module.exports = class APIError extends Error {
    constructor(status, code, message) {
        super()
        this.name = 'APIError'
        this.status = status
        this.code = code
        this.message = message
    }

    /**
     * 10xx
     */

    static UNKNOWN() {

    }

    static DISCONNECTED() {

    }

    static UNAUTHORIZED() {

    }

    static TOO_MANY_REQUESTS() {

    }

    static UNEXPECTED_RESP() {

    }

    static TIMEOUT() {

    }

    static UNKNOWN_ORDER_COMPOSITION() {

    }

    static TOO_MANY_ORDERS() {

    }

    static SERVICE_SHUTTING_DOWN() {

    }

    static UNSUPPORTED_OPERATION() {

    }

    static INVALID_TIMESTAMP() {

    }

    static INVALID_SIGNATURE() {

    }

    /**
     * 11xx
     */

    static ILLEGAL_CHARS(param, regexp) {
        if (param && regexp) {
            return new APIError(
                400,
                -1100,
                `Illegal characters found in parameter '${param}'; legal range is '${regexp}'.`
            )
        } else {
            return new APIError(
                400,
                -1100,
                `Illegal characters found in a parameter`
            )
        }
    }

    static TOO_MANY_PARAMETERS() {

    }

    static MANDATORY_PARAM_EMPTY_OR_MALFORMED(param) {
        return new APIError(
            400,
            -1102,
            `Mandatory parameter '${param}' was not sent, was empty/null, or malformed`
        )
    }

    static UNKNOWN_PARAM() {

    }

    static UNREAD_PARAMETERS() {

    }

    static PARAM_EMPTY(param) {
        return new APIError(
            400,
            -1105,
            `Parameter '${param}' was empty`
        )
    }

    static PARAM_NOT_REQUIRED() {

    }

    

    static BAD_PRECISION() {

    }

    static NO_DEPTH() {

    }

    static BAD_INTERVAL(param) {
        return new APIError(
            400,
            -1120,
            `Invalid interval`
        )
    }

    static BAD_SYMBOL(param) {
        return new APIError(
            400,
            -1121,
            `Invalid symbol`
        )
    }

    static INVALID_LISTEN_KEY() {

    }

    static MORE_THAN_XX_HOURS() {

    }

    static OPTIONAL_PARAMS_BAD_COMBO() {

    }

    static INVALID_PARAMETER() {

    }

    /**
     * 20xx
     */

    static NEW_ORDER_REJECTED() {

    }

    static CANCEL_REJECTED() {

    }

    static NO_SUCH_ORDER() {
        
    }

    static BAD_API_KEY_FMT() {
        return new APIError(
            401,
            -2014,
            `API-key format invalid.`
        )
    }

    static REJECTED_MBX_KEY() {
        return new APIError(
            401,
            -2015,
            `Invalid API-key, IP, or permissions for action.`
        )
    }

    static NO_TRADING_WINDOW() {

    }
}
