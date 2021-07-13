const secret = process.env.JWT_SECRET
const expiresIn = process.env.JWT_EXPIRATION
const algorithm = process.env.JWT_ALGORITHM

module.exports = {
    secret: secret,
    expiresIn: expiresIn,
    algorithm: algorithm
}