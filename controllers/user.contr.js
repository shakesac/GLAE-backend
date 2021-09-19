const AppError = require('../util/appError')
const bcrypt = require('bcrypt')
const bcryptSalt = parseInt(process.env.BCRYPT_SALT)
const User = require('../models/user.model')
const Cargo = require('../models/cargo.model')
const Role = require('../models/user-role.model')
const Lease = require('../models/lease.model')
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

exports.update = async (req, res, next) => {
    try {
        const {firstName, lastName, address, phoneNumber} = req.body
        const user = await User.findByPk(req.params.id)
        if (!user) return next(new AppError('O utilizador indicado não existe.', 404, 'not found'))
        else {
            user.update({firstName, lastName, address, phoneNumber})
            return res.status(200).json({
                status: 'success',
                message: 'O utilizador foi alterado com sucesso.'
            })
        }
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
}

exports.getAll = async (req, res, next) => {
    try {
        const { subsection, limit } = req.query
        if (subsection) {
            const exists = await Subsection.findByPk(subsection)
            if (!exists) return next(new AppError('O grupo indicado não existe.', 404, 'not found'))
        }
        let options
        if (subsection && !limit) {
            options = {
                where: {subsectionId: subsection},
                include: [{
                model: Cargo,
                attributes: ['cargo']
            }],
            attributes: { exclude: ['password']},
            order: [['firstName'],['lastName'],['createdAt']],
        }
        } else if (!subsection && limit) {
            options = {
                include: [{
                model: Cargo,
                attributes: ['cargo']
            }],
            attributes: { exclude: ['password']},
            limit: parseInt(limit, 10),
            order: [['firstName'],['lastName'],['createdAt']],
        }
        } else if (subsection && limit) {
            options = {
                where: {subsectionId: subsection},
                include: [{
                model: Cargo,
                attributes: ['cargo']
            }],
            attributes: { exclude: ['password']},
            limit: parseInt(limit, 10),
            order: [['firstName'],['lastName'],['createdAt']],
        }
        } else {
            options = {
                include: [{
                model: Cargo,
                attributes: ['cargo']
            }],
            attributes: { exclude: ['password']},
            order: [['firstName'],['lastName'],['createdAt']]
        }}
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

exports.setCargo = async (req, res, next) => {
    try {
        const { cargoId } = req.body
        const user = await User.findByPk(req.params.id)
        const cargo = await Cargo.findByPk(cargoId)
        if (!user) return next(new AppError('O utilizador indicado não existe.', 404, 'not found'))
        else if (!cargo) return next(new AppError('O cargo indicado não existe.', 404, 'not found'))
        else {
            user.setCargo(cargo)
            return res.status(200).json({
                status: 'success',
                message: `O cargo ${cargo.cargo} foi atribuído ao utilizador.`
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.togglePermissions = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id)
        let role
        if (!user) return next(new AppError('O utilizador indicado não existe.', 404, 'not found'))
        else {
            const roleId = user.roleId
            if (!roleId) {
                role = await Role.findByPk(2)
                user.setRole(role)
            } else if (roleId == 1) {
                role = await Role.findByPk(2)
                user.setRole(role)
            } else {
                role = await Role.findByPk(1)
                user.setRole(role)
            }
        }
        return res.status(200).json({
            status: 'success',
            message: `Foram atribuidas permissões de ${role.role}`
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.getLeases = async (req, res, next) => {
    try {
        const userId = req.params.id || req.user.id
        const user = await User.findByPk(userId)
        if (!user) return next(new AppError('O utilizador indicado não existe.', 404, 'not found'))
        const options = { where: { userId }, order: [['createdAt', 'DESC']]}
        const leases = await Lease.findAll(options)
        return res.status(200).json({
            status: 'success',
            data: leases
        })  
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}