const AppError = require('../util/appError')
const helper = require('../util/contr.helpers')
const bcrypt = require('bcrypt')
const bcryptSalt = parseInt(process.env.BCRYPT_SALT)
const User = require('../models/user.model')
const Item = require('../models/item.model')
const Subsection = require('../models/subsection.model')

exports.new = async (req, res, next) => {
    try {
        const {firstName, lastName, email, address, phoneNumber, password, confirmPassword} = req.body
        const user = await User.findOne({ where: { email }})
        if (user) return next(new AppError('Já existe um utilizador com o email indicado.', 400, 'failed'))
        if (password !== confirmPassword) {
            return next(new AppError('A palavra-passe e a confirmação não coincidem.', 400, 'failed'))
        }
        const hashedPw = await bcrypt.hash(password, bcryptSalt)
        await User.create({
            firstName,
            lastName,
            email,
            address,
            phoneNumber,
            password:hashedPw
        })
        return res.status(201).json({
            status: 'success',
            message: 'O utilizador foi registado com sucesso.'
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.pwd = async (req, res, next) => {
    try {
        const {newPwd, confNewPwd} = req.body
        const user = await User.findByPk(req.params.id)
        if (!user) return next(new AppError('Utilizador inexistente.', 404, 'not found'))
        if (newPwd !== confNewPwd) {
            return next(new AppError('A nova senha e confirmação não correspondem.', 400, 'failed'))
        } else {
            user.password = await bcrypt.hash(newPwd, bcryptSalt)
            await user.save()
            return res.status(201).json({
                status: 'success',
                message: 'A senha foi alterada com sucesso.'
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.get = async (req, res, next) => {
    try {
        let options = {attributes: { exclude: ['password'] }}
        const user = await User.findByPk(req.params.id, options)
        console.log(user)
        if (!user) return next(new AppError('O utilizador indicado não existe.', 404, 'not found'))
        else return res.status(200).json({
            status: "success",
            data: user
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
    //let options = { include: Subsection, attributes: { exclude: ['password'] }}
}

exports.getAll = async (req, res, next) => {
    try {
        let options = {attributes: { exclude: ['password'] }}
        const users = await User.findAll(options)
        if (!users) return next(new AppError('Não existem utilizadores.', 404, 'not found'))
        else return res.status(200).json({
            status: "success",
            data: users
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.delete = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id)
        if (!user) return next(new AppError('O utilizador indicado não existe.', 404, 'not found'))
        else {
            user.destroy()
            return res.status(200).json({
                status: 'success',
                message: 'O utilizador foi eliminado.'
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}