function canSend(code) {
    return -2016 <= code && code <= -1000
}

function statusCode(code) {
    if ([-2015, -2014].includes(code)) {
        return 401
    }
    if ([-1006, -1007].includes(code)) {
        return 504
    }
    if ([-1003].includes(code)) {
        return 429
    }

    return 400
}

module.exports = (err, req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
        console.error(err)
    }

    const code = parseInt(err.code)
    if (!isNaN(code)) {
        if (canSend(code)) {
            return res.status(statusCode(code)).send({
                code: err.code,
                msg: err.message
            })
        }
    }

    res.set('Content-Type', 'text/plain')
    if (process.env.NODE_ENV === 'production') {
        res.status(500).send('Internal Server Error')
    } else {
        res.status(500).send(err.message)
    }
}
