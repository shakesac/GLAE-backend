const passport = require('passport')
const passportJWT = require('passport-jwt')
const ExtractJWT = passportJWT.ExtractJwt
const StrategyJWT = passportJWT.Strategy
const User = require('../models/user.model')

passport.use(new StrategyJWT({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: process.env.JWT_SECRET
}), (jwtPayload, done) => {
    return User.findOne({
        where: { id: jwtPayload.id }
    }).then((user) => {
        return done(null, user)
    }).catch((err) => {
        return done(err)
    })
})