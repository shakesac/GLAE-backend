const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const helper = require('../util/contr.helpers')
const User = require('../models/user.model')
const bcryptSalt = parseInt(process.env.BCRYPT_SALT)
const Subsection = require('../models/subsection.model')

exports.register = async (req, res) => {
    const {firstName, lastName, email, address, phoneNumber, password, confirmPassword, subsectionId} = req.body
    const options = { where: { email }}
    try {
        const exists = await helper.checkIfExistsWithOptions(User, options)
        if (exists) {
            return res.status(400).json({
                status: 'failed',
                message: 'Já existe um utilizador com o email indicado.'
            })
        }
        if (subsectionId) {
            const idSplit = subsectionId.split('')
            if (!idSplit || !idSplit[1]) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Código de grupo inválido.'
                })
            }
            const options = { where: { id: idSplit[1] }}
            const exists = await helper.checkIfExists(Subsection, idSplit[1])
            if (!exists) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Não existe nenhum grupo com o código indicado.'
                })
            }
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'failed',
                message: 'A palavra-passe e a confirmação não coincidem.'
            })
        }
        const hashedPw = await bcrypt.hash(password, bcryptSalt)
        const newUser = new User({
            firstName,
            lastName,
            email,
            address,
            phoneNumber,
            password: hashedPw,
            subsectionId
        })
        await newUser.save()
        return res.status(201).json({
            status: 'success',
            message: 'O utilizador foi registado com sucesso.'
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            status: 'failed',
            message: err.name
        })
    }
}

exports.login = async (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body
    let options = { where: { email } }
    try {
        const exists = await helper.checkIfExistsWithOptions(User, options)
        if (!exists){
            return res.status(400).json({
                status: 'failed',
                message: 'Utilizador ou senha inválidos!'  //Não divulgamos apenas que a senha está errada por razões de segurança
            })            
        }
        const user = await User.findOne(options)
        const equal = await bcrypt.compare(password, user.password)
        if (!equal) {
            return res.status(400).json({
                status: 'failed',
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
            // Remover a key password antes enviar a response
            user.password = 0
            return res.status(200).json({
                status: 'success',
                data: {
                    token,
                    user
                }
            })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            status: 'failed',
            message: err.name
        })
    }            
}

exports.verify = async (req, res, next) => {
    let token = req.headers['x-access-token']
    if (!token) {
        return res.status(403).json({
            status: 'failed',
            message: 'Não tem sessão iniciada.'
        })
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
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


exports.isAdmin = async (req, res, next) => {
    await User.findByPk(req.user.id).then(user => {
        if (user.roleId === 1) {
            next()
            return
        } else {
            return res.status(403).json({
                status: 'failed',
                message: 'Não tem permissões de administrador.'
            })
        }
    })
}

/*
exports.verify = async (req, res, next) => {
    console.log('verifyAuth: ', req.cookies)
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
*/