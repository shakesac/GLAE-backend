
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const bcryptSalt = parseInt(process.env.BCRYPT_SALT)
const jwtConfig = require('../util/jwt')
const app = require('../app')

exports.register = (req, res, next) => {
    const {firstName, lastName, email, address, phoneNumber, password} = req.body
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (user) {
            return res.status(400).json({
                status: 'failed',
                message: 'Já existe um utilizador com o email indicado.'
            })
        }
        return bcrypt.hash(password, bcryptSalt)
    }).then(hashedPw => {
        const newUser = new User({
            firstName,
            lastName,
            email,
            address,
            phoneNumber,
            password: hashedPw
        })
        return newUser.save().catch(err => {
            res.status(400).json({
                status: 'failed',
                message: err.errors[0].message,
            })
        })
    }).then((result) => {
        return res.status(201).json({
            status: 'success',
            message: 'O utilizador foi registado com sucesso.'
        })
    }).catch(err => {
        res.status(400).json({
            status: 'failed',
            message: err.errors[0].message,
        })
    })
}

exports.login = (req, res, next) => {
    const { email, password } = req.body
    User.findOne({
        where: {
            email
        }
    }).then(user => {
        if (!user) {
            return res.status(202).json({
                status: 'failed',
                message: 'Utilizador ou senha inválidos!'  //Não divulgamos apenas que o email não existe por razões de segurança
            })
        }
        bcrypt.compare(password, user.password).then(result => {
            if (!result) {
                return res.status(202).json({
                    status: 'fail',
                    message: 'Utilizador ou senha inválidos!'  //Não divulgamos apenas que a senha está errada por razões de segurança
                })
            } else {
                const token = jwt.sign({
                    id: user.id,
                    email: user.email
                }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRATION,
                    algorithm: process.env.JWT_ALGORITHM
                })
                res.cookie('jwt', token, {
                    httpOnly: true,
                    secure: process.env.HTTP_ACTIVE,
                })
                return res.status(200).json({
                    status: 'success',
                    message: 'Sessão iniciada',
                    token: token
                })
            }
        }).catch(err => {
            res.status(202).json({
                status: 'failed',
                message: err
            })
        })
    })
}

exports.verify = async (req, res, next) => {
    const userToken = req.cookies.jwt
    if (!userToken) {
        return res.status(401).json({
            status: 'failed',
            message: 'Não tem sessão iniciada.'
        })
    }
    jwt.verify(userToken, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({
                status: 'failed',
                message: 'O token não é válido.'
            })
        } else {
            // Verifica se utilizador ao qual o token pertence ainda existe
            const user = await User.findByPk(decoded.id)
            if (!user) {
                return res.status(401).json({
                    status: 'failed',
                    message: 'O utilizador já não existe.'
                })
            }
            req.user = user
            next()
        }
    })
}

exports.logout = (req, res) => {
    if (req.cookies.jwt) {
        res.clearCookie('jwt').status(200).json({
            status: 'success',
            message: 'Sessão terminada.'
        })
    } else {
        res.status(401).json({
            status: 'failed',
            message: 'JWT inválido.'
        })
    }
}