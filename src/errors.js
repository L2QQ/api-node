function error(code, message) {
    const err = new Error(message)
    err.name = 'L2QQError'
    err.code = code
    return err
}

module.exports = class {
    /**
     * 10xx
     */

    static UNKNOWN() {
        return error(
            -1000,
            `An unknown error occured while processing the request.`
        )
    }

    static DISCONNECTED() {
        return error(
            -1001,
            `Internal error; unable to process your request. Please try again.`
        )
    }

    static UNAUTHORIZED() {
        return error(
            -1002,
            `You are not authorized to execute this request.`
        )
    }

    static TOO_MANY_REQUESTS() {
        return error(
            -1003,
            `Too many requests; please use the websocket for live updates.`
        )
    }

    static UNEXPECTED_RESP() {
        return error(
            -1006,
            `An unexpected response was received from the message bus. Execution status unknown.`
        )
    }

    static TIMEOUT() {
        return error(
            -1007,
            `Timeout waiting for response from backend server. Send status unknown; execution status unknown.`
        )
    }

    static UNKNOWN_ORDER_COMPOSITION() {
        return error(
            -1014,
            `Unsupported order combination.`
        )
    }

    static TOO_MANY_ORDERS() {
        return error(
            -1015,
            `Too many new orders.`
        )
    }

    static SERVICE_SHUTTING_DOWN() {
        return error(
            -1016,
            `This service is no longer available.`
        )
    }

    static UNSUPPORTED_OPERATION() {
        return error(
            -1020,
            `This operation is not supported.`
        )
    }

    static INVALID_TIMESTAMP(ahead) {
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
    }

    static INVALID_SIGNATURE() {
        return error(
            -1022,
            `Signature for this request is not valid.`
        )
    }

    /**
     * 11xx
     */

    static ILLEGAL_CHARS(param, regexp) {
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
    }

    static TOO_MANY_PARAMETERS() {
        return error(
            -1101,
            `Too many parameters sent for this endpoint.`
        )
    }

    static MANDATORY_PARAM_EMPTY_OR_MALFORMED(first, second) {
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
    }

    static UNKNOWN_PARAM() {
        return error(
            -1103,
            `An unknown parameter was sent.`
        )
    }

    static UNREAD_PARAMETERS() {
        return error(
            -1104,
            `Not all sent parameters were read.`
        )
    }

    static PARAM_EMPTY(param) {
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
    }

    static PARAM_NOT_REQUIRED() {
        return error(
            -1106,
            `A parameter was sent when not required.`
        )
    }

    static BAD_PRECISION() {
        return error(
            -1111,
            `Precision is over the maximum defined for this asset.`
        )
    }

    static NO_DEPTH() {
        return error(
            -1112,
            `No orders on book for symbol.`
        )
    }

    static FILTER_FAILURE(name) {
        return error(-1013, `Filter failure: ${name}`)
    }

    static TIF_NOT_REQUIRED() {
        return error(
            -1114,
            `TimeInForce parameter sent when not required.`
        )
    }

    static INVALID_TIF() {
        return error(
            -1115,
            `Invalid timeInForce.`
        )
    }

    static INVALID_ORDER_TYPE() {
        return error(
            -1116,
            `Invalid orderType.`
        )
    }

    static INVALID_SIDE() {
        return error(
            -1117,
            `Invalid side.`
        )
    }

    static EMPTY_NEW_CL_ORD_ID() {
        return error(
            -1118,
            `New client order ID was empty.`
        )
    }

    static EMPTY_ORG_CL_ORD_ID() {
        return error(
            -1119,
            `Original client order ID was empty.`
        )
    }

    static BAD_INTERVAL(param) {
        return error(
            -1120,
            `Invalid interval.`
        )
    }

    static BAD_SYMBOL(param) {
        return error(
            -1121,
            `Invalid symbol`
        )
    }

    static INVALID_LISTEN_KEY() {
        return error(
            -1125,
            `This listenKey does not exist.`
        )
    }

    static MORE_THAN_XX_HOURS() {
        return error(
            -1127,
            `Lookup interval is too big.`
        )
    }

    static OPTIONAL_PARAMS_BAD_COMBO() {
        return error(
            -1128,
            `Combination of optional parameters invalid.`
        )
    }

    static INVALID_PARAMETER() {
        return error(
            -1130,
            `Invalid data sent for a parameter.`
        )
    }

    /**
     * 20xx
     */

    static NEW_ORDER_REJECTED(reason) {
        return error(
            -2010,
            reason
        )
    }

    static CANCEL_REJECTED(reason) {
        return error(
            -2011,
            reason
        )
    }

    static NO_SUCH_ORDER() {
        return error(
            -2013,
            `Order does not exist.`
        )
    }

    static BAD_API_KEY_FMT() {
        return error(
            -2014,
            `API-key format invalid.`
        )
    }

    static REJECTED_MBX_KEY() {
        return error(
            -2015,
            `Invalid API-key, IP, or permissions for action.`
        )
    }

    static NO_TRADING_WINDOW() {
        return error(
            -2016,
            `No trading window could be found for the symbol. Try ticker/24hrs instead.`
        )
    }
}
