const APIError = require('../errors')

module.exports = (err, req, res, next) => {
    console.log(err)

    if (err instanceof APIError) {
        return res.status(err.status).send({
            code: err.code,
            msg: err.message
        })
    }
    res.status(500).send(err.message)
}
