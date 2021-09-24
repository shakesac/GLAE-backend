const AppError = require('../util/appError')
const { Op } = require("sequelize")
const helper = require('../util/contr.helpers')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const bcryptSalt = parseInt(process.env.BCRYPT_SALT)
const Subsection = require('../models/subsection.model')

exports.register = async (req, res, next) => {
    const {firstName, lastName, email, address, phoneNumber, password, confirmPassword, subsectionId} = req.body
    console.log(req.body)
    const options = { where: { email }}
    try {
        const exists = await helper.checkIfExistsWithOptions(User, options)
        if (exists) return next(new AppError('Já existe um utilizador com o email indicado.', 400, 'failed'))
        const subsection = await Subsection.findByPk(subsectionId)
        if (!subsection) return next(new AppError('Código de grupo inválido.', 400, 'failed'))
        /*if (subsectionId) {
            subsectionId
            if (!idSplit || !idSplit[0]) return next(new AppError('Código de grupo inválido.', 400, 'failed'))
            const options = { where: { id: idSplit[1] }}
            const exists = await helper.checkIfExists(Subsection, idSplit[1])
            if (!exists) return next(new AppError('Não existe nenhum grupo com o código indicado.', 400, 'failed'))
        }*/
        if (password !== confirmPassword) {
            return next(new AppError('A palavra-passe e a confirmação não coincidem.', 400, 'failed'))
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
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.login = async (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body
    let options = { where: { email } }
    try {
        const exists = await helper.checkIfExistsWithOptions(User, options)
        if (!exists) return next(new AppError('Utilizador ou senha inválidos!', 400, 'failed')) //Não divulgamos apenas que o utilizador está errada por razões de segurança
        const user = await User.findOne(options)
        const equal = await bcrypt.compare(password, user.password)
        if (!equal) return next(new AppError('Utilizador ou senha inválidos!', 400, 'failed'))
        else {
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
        return next(new AppError(err.toString(), 500, 'error'))
    }            
}

exports.verify = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token']
        if (!token) return next(new AppError('Não tem sessão iniciada.', 403, 'failed'))
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return next(new AppError('O token não é válido.', 401, 'failed'))
            else {
                // Verifica se utilizador ao qual o token pertence ainda existe
                const options = { attributes: { exclude: ['password'] }}
                const user = await User.findByPk(decoded.id, options)
                if (!user) return next(new AppError('O utilizador já não existe.', 401, 'failed'))
                req.user = user
                next()
            }
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        const user = req.user
        if (user.roleId === 1) next()
        else return next(new AppError('Não tem permissões de administrador.', 403, 'failed'))
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}