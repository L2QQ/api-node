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
        return new APIError(
            400,
            -1000,
            `An unknown error occured while processing the request.`
        )
    }

    static DISCONNECTED() {
        return new APIError(
            400,
            -1001,
            `Internal error; unable to process your request. Please try again.`
        )
    }

    static UNAUTHORIZED() {
        return new APIError(
            400,
            -1001,
            `Internal error; unable to process your request. Please try again.`
        )
    }

    static TOO_MANY_REQUESTS() {
        return new APIError(
            429,
            -1003,
            `Too many requests; please use the websocket for live updates.`
        )
    }

    static UNEXPECTED_RESP() {
        return new APIError(
            504,
            -1006,
            `An unexpected response was received from the message bus. Execution status unknown.`
        )
    }

    static TIMEOUT() {
        return new APIError(
            504,
            -1007,
            `Timeout waiting for response from backend server. Send status unknown; execution status unknown.`
        )
    }

    static UNKNOWN_ORDER_COMPOSITION() {
        return new APIError(
            400,
            -1014,
            `Unsupported order combination.`
        )
    }

    static TOO_MANY_ORDERS() {
        return new APIError(
            400,
            -1015,
            `Too many new orders.`
        )
    }

    static SERVICE_SHUTTING_DOWN() {
        return new APIError(
            400,
            -1016,
            `This service is no longer available.`
        )
    }

    static UNSUPPORTED_OPERATION() {
        return new APIError(
            400,
            -1020,
            `This operation is not supported.`
        )
    }

    static INVALID_TIMESTAMP() {
        // Timestamp for this request was 1000ms ahead of the server's time.
        return new APIError(
            400,
            -1021,
            `Timestamp for this request is outside of the recvWindow.`
        )
    }

    static INVALID_SIGNATURE() {
        return new APIError(
            400,
            -1022,
            `Signature for this request is not valid.`
        )
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
        return new APIError(
            400,
            -1101,
            `Invalid API-key, IP, or permissions for action.`
        )
    }

    static MANDATORY_PARAM_EMPTY_OR_MALFORMED(param) {
        return new APIError(
            400,
            -1102,
            `Mandatory parameter '${param}' was not sent, was empty/null, or malformed`
        )
    }

    static UNKNOWN_PARAM() {
        return new APIError(
            400,
            -1103,
            `Invalid API-key, IP, or permissions for action.`
        )
    }

    static UNREAD_PARAMETERS() {
        return new APIError(
            400,
            -1104,
            `Invalid API-key, IP, or permissions for action.`
        )
    }

    static PARAM_EMPTY(param) {
        return new APIError(
            400,
            -1105,
            `Parameter '${param}' was empty`
        )
    }

    static PARAM_NOT_REQUIRED() {
        return new APIError(
            400,
            -1106,
            `Invalid API-key, IP, or permissions for action.`
        )
    }

    static BAD_PRECISION() {
        return new APIError(
            400,
            -1111,
            `Invalid API-key, IP, or permissions for action.`
        )
    }

    static NO_DEPTH() {
        return new APIError(
            400,
            -1112,
            `Invalid API-key, IP, or permissions for action.`
        )
    }

    static TIF_NOT_REQUIRED() {
        return new APIError(
            400,
            -1114,
            `Invalid API-key, IP, or permissions for action.`
        )
    }

    static INVALID_TIF() {
        return new APIError(
            400,
            -1115,
            `Invalid API-key, IP, or permissions for action.`
        )
    }

    static INVALID_ORDER_TYPE() {
        return new APIError(
            400,
            -1116,
            `Invalid API-key, IP, or permissions for action.`
        )
    }

    static INVALID_SIDE() {
        return new APIError(
            400,
            -1117,
            `Invalid API-key, IP, or permissions for action.`
        )
    }

    static EMPTY_NEW_CL_ORD_ID() {
        return new APIError(
            400,
            -1118,
            `Invalid API-key, IP, or permissions for action.`
        )
    }

    static EMPTY_ORG_CL_ORD_ID() {
        return new APIError(
            400,
            -1119,
            `Invalid API-key, IP, or permissions for action.`
        )
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
        return new APIError(
            400,
            -1125,
            `Invalid API-key, IP, or permissions for action.`
        )
    }

    static MORE_THAN_XX_HOURS() {
        return new APIError(
            400,
            -1127,
            `Invalid API-key, IP, or permissions for action.`
        )
    }

    static OPTIONAL_PARAMS_BAD_COMBO() {
        return new APIError(
            400,
            -1128,
            `Invalid API-key, IP, or permissions for action.`
        )
    }

    static INVALID_PARAMETER() {
        return new APIError(
            400,
            -1130,
            `Invalid API-key, IP, or permissions for action.`
        )
    }

    /**
     * 20xx
     */

    static NEW_ORDER_REJECTED() {
        return new APIError(
            400,
            -2010,
            `Invalid API-key, IP, or permissions for action.`
        )
    }

    static CANCEL_REJECTED() {
        return new APIError(
            400,
            -2011,
            `Invalid API-key, IP, or permissions for action.`
        )
    }

    static NO_SUCH_ORDER() {
        return new APIError(
            400,
            -2013,
            `Invalid API-key, IP, or permissions for action.`
        )
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
        return new APIError(
            400,
            -2016,
            `Invalid API-key, IP, or permissions for action.`
        )
    }
}
