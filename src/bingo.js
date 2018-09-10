
/*
module.exports = (req, res, next) => {
    const apiKey = req.header('apikey')
    if (!apiKey) {
        return res.status(401).send({
            msg: 'API-key format invalid'
        })
    }

    if (!req.query.timestamp) {
        return res.status(400).send({
            msg: 'Need timestamp'
        })
    }

    const timestamp = parseInt(req.query.timestamp)
    if (!timestamp) {
        return res.status(400).send({
            msg: 'Invalid timestamp'
        })
    }

    const signature = req.query.signature
    if (!signature) {
        return res.status(400).send({
            msg: 'Need signature'
        })
    }

    const db = req.app.db
    db.one('SELECT * FROM apis WHERE key = $1', [apiKey]).then(api => {
        db.one('SELECT * FROM users WHERE id = $1', [api.user_id]).then(user => {
            delete req.query.signature
            const query = Object.entries(req.query).map(p => p[0] + '=' + p[1]).join('&')
            
            // Check timestamp

            const hmac = crypto.createHmac('sha256', api.secret)
            hmac.update(query)
            const check = hmac.digest('hex')

            if (signature != check) {
                return res.status(401).send({
                    msg: 'Bad signature'
                })
            }

            req.user = user
            next()
        }).catch(err => {
            console.error(err)
            res.status(500).send({
                msg: 'Internal error'
            })
        })
    }).catch(err => {
        console.error(err)
        res.status(401).send({
            msg: 'API-key format invalid'
        })
    })
}

app.use((req, res, next) => {
    const apiKey = req.header('X-MBX-APIKEY')
    if (!apiKey) {
        console.error('Fire')
        throw Error('Need api key')
    }
    
    
    const rows = req.app.db.any('SELECT * FROM apikeys WHERE key = $1', [key])
    
    console.log(rows)

    next()
})

*/