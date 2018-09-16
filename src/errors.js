function error(code, message) {
    const err = new Error(message)
    err.name = 'L2QQERROR'
    err.code = code
    return err
}

module.exports = {
    MAKE: error,

    /**
     * 10xx
     */

    UNKNOWN() {
        return error(
            -1000,
            `An unknown error occured while processing the request.`
        )
    },

    DISCONNECTED() {
        return error(
            -1001,
            `Internal error; unable to process your request. Please try again.`
        )
    },

    UNAUTHORIZED() {
        return error(
            -1002,
            `You are not authorized to execute this request.`
        )
    },

    TOO_MANY_REQUESTS() {
        return error(
            -1003,
            `Too many requests; please use the websocket for live updates.`
        )
    },

    UNEXPECTED_RESP() {
        return error(
            -1006,
            `An unexpected response was received from the message bus. Execution status unknown.`
        )
    },

    TIMEOUT() {
        return error(
            -1007,
            `Timeout waiting for response from backend server. Send status unknown; execution status unknown.`
        )
    },

    UNKNOWN_ORDER_COMPOSITION() {
        return error(
            -1014,
            `Unsupported order combination.`
        )
    },

    TOO_MANY_ORDERS() {
        return error(
            -1015,
            `Too many new orders.`
        )
    },

    SERVICE_SHUTTING_DOWN() {
        return error(
            -1016,
            `This service is no longer available.`
        )
    },

    UNSUPPORTED_OPERATION() {
        return error(
            -1020,
            `This operation is not supported.`
        )
    },

    INVALID_TIMESTAMP(ahead) {
        if (ahead) {
            return error(
                -1021,
                `Timestamp for this request was 1000ms ahead of the server's time.`
            )
        } else {
            return error(
                -1021,
                `Timestamp for this request is outside of the recvWindow.`
            )
        }
    },

    INVALID_SIGNATURE() {
        return error(
            -1022,
            `Signature for this request is not valid.`
        )
    },

    /**
     * 11xx
     */

    ILLEGAL_CHARS(param, regexp) {
        if (param && regexp) {
            return error(
                -1100,
                `Illegal characters found in parameter '${param}'; legal range is '${regexp}'.`
            )
        } else {
            return error(
                -1100,
                `Illegal characters found in a parameter`
            )
        }
    },

    TOO_MANY_PARAMETERS() {
        return error(
            -1101,
            `Too many parameters sent for this endpoint.`
        )
    },

    MANDATORY_PARAM_EMPTY_OR_MALFORMED(first, second) {
        if (first && second) {
            return error(
                -1102,
                `Param ${first} or ${second} must be sent, but both were empty/null!`
            )
        } else if (first) {
            return error(
                -1102,
                `Mandatory parameter '${first}' was not sent, was empty/null, or malformed`
            )
        } else {
            return error(
                -1102,
                `A mandatory parameter was not sent, was empty/null, or malformed.`
            )
        }
    },

    UNKNOWN_PARAM() {
        return error(
            -1103,
            `An unknown parameter was sent.`
        )
    },

    UNREAD_PARAMETERS() {
        return error(
            -1104,
            `Not all sent parameters were read.`
        )
    },

    PARAM_EMPTY(param) {
        if (param) {
            return error(
                -1105,
                `Parameter '${param}' was empty`
            )
        } else {
            return error(
                -1105,
                `A parameter was empty.`
            )
        }
    },

    PARAM_NOT_REQUIRED() {
        return error(
            -1106,
            `A parameter was sent when not required.`
        )
    },

    BAD_PRECISION() {
        return error(
            -1111,
            `Precision is over the maximum defined for this asset.`
        )
    },

    NO_DEPTH() {
        return error(
            -1112,
            `No orders on book for symbol.`
        )
    },

    FILTER_FAILURE(name) {
        return error(-1013, `Filter failure: ${name}`)
    },

    TIF_NOT_REQUIRED() {
        return error(
            -1114,
            `TimeInForce parameter sent when not required.`
        )
    },

    INVALID_TIF() {
        return error(
            -1115,
            `Invalid timeInForce.`
        )
    },

    INVALID_ORDER_TYPE() {
        return error(
            -1116,
            `Invalid orderType.`
        )
    },

    INVALID_SIDE() {
        return error(
            -1117,
            `Invalid side.`
        )
    },

    EMPTY_NEW_CL_ORD_ID() {
        return error(
            -1118,
            `New client order ID was empty.`
        )
    },

    EMPTY_ORG_CL_ORD_ID() {
        return error(
            -1119,
            `Original client order ID was empty.`
        )
    },

    BAD_INTERVAL(param) {
        return error(
            -1120,
            `Invalid interval.`
        )
    },

    BAD_SYMBOL(param) {
        return error(
            -1121,
            `Invalid symbol`
        )
    },

    INVALID_LISTEN_KEY() {
        return error(
            -1125,
            `This listenKey does not exist.`
        )
    },

    MORE_THAN_XX_HOURS() {
        return error(
            -1127,
            `Lookup interval is too big.`
        )
    },

    OPTIONAL_PARAMS_BAD_COMBO() {
        return error(
            -1128,
            `Combination of optional parameters invalid.`
        )
    },

    INVALID_PARAMETER() {
        return error(
            -1130,
            `Invalid data sent for a parameter.`
        )
    },

    /**
     * 20xx
     */

    NEW_ORDER_REJECTED(reason) {
        return error(
            -2010,
            reason
        )
    },

    CANCEL_REJECTED(reason) {
        return error(
            -2011,
            reason
        )
    },

    NO_SUCH_ORDER() {
        return error(
            -2013,
            `Order does not exist.`
        )
    },

    BAD_API_KEY_FMT() {
        return error(
            -2014,
            `API-key format invalid.`
        )
    },

    REJECTED_MBX_KEY() {
        return error(
            -2015,
            `Invalid API-key, IP, or permissions for action.`
        )
    },

    NO_TRADING_WINDOW() {
        return error(
            -2016,
            `No trading window could be found for the symbol. Try ticker/24hrs instead.`
        )
    }
}
