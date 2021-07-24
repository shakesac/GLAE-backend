const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const expiresIn = process.env.JWT_EXPIRATION
const algorithm = process.env.JWT_ALGORITHM

exports.check = (req, res, next) => {
    let userToken = req.headers.authorization
    if (userToken) {
        jwt.verify(userToken, secret, {
            expiresIn, algorithm
        }, (err, data) => {
            if (error) {
                return res.status(401).json({
                    status: 'failed',
                    message: 'O token é inválido.'
                })
            } else {
                req.user = data
                next()
            }
        })
    } else {
        return res.status(500).json({
            status: 'failed',
            message: 'Nenhum token providenciado.'
        })
    }
}