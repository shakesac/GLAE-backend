const AppError = require('../util/appError')
const { Op } = require("sequelize");
const helper = require('../util/contr.helpers')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const bcryptSalt = parseInt(process.env.BCRYPT_SALT)
const User = require('../models/user.model')
const Subsection = require('../models/subsection.model')
const LeaseStatus = require('../models/lease-status.model')

const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
        algorithm: process.env.JWT_ALGORITHM
    })
}

exports.get = async (req, res, next) => {
    try {
        const options = {
            include: [{
                model: Subsection,
                attributes: ['sectionId'],
            }],
            attributes: {
                exclude: ['password']
            }
        }
        const user = await User.findByPk(req.user.id, options)
        return res.status(200).json({
            status: 'success',
            data: user
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.update = async (req, res, next) => {
    try {
        const {firstName, lastName, address, phoneNumber, subsectionId} = req.body
        const user = req.user
        const result = await User.update({
            firstName, lastName, address, phoneNumber, subsectionId
        }, {where: { id: user.id }})
        if (result[0] > 0) {
            return res.status(200).json({
                status: 'success',
                message: 'O teu perfil foi actualizado.'
            })
        }
        else next(new AppError('Não foram efectuadas alterações.', 400, 'failed'))
    } catch(err) {
        console.log(err)
        next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.getLeases = async (req, res, next) => {
    try {
        const { status } = req.query
        const user = await User.findByPk(req.user.id)
        let options
        if (status) {
            options = {
                include: [{
                    model: LeaseStatus,
                    attributes: ['status'],
                    where: {
                        status: status,
                        isActive: true
                    }
                }],
                order: [['createdAt', 'DESC']]
            }
        } else {
            options = {
                include: [{
                    model: LeaseStatus,
                    attributes: ['status'],
                    where: {
                        isActive: true
                    }
                }],
                order: [['createdAt', 'DESC']]
            }
        }
        const leases = await user.getLeases(options)
        if (leases.length < 1) return next(new AppError('Não tem emprestimos.', 404, 'not found'))
        return res.status(200).json({
            status: 'success',
            data: leases
        })
    } catch(err) {
        console.log(err)
        next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.pwd = async (req, res, next) => {
    try {
        const { currentPwd, newPwd, confNewPwd} = req.body
        const user = await User.findByPk(req.user.id)
        const equal = await bcrypt.compare(currentPwd, user.password)
        if (!equal) return next(new AppError('A senha actual não está correcta.', 401, 'failed'))
        if (newPwd !== confNewPwd) {
            return next(new AppError('A nova senha e confirmação não correspondem.', 400, 'failed'))
        }
        user.password = await bcrypt.hash(newPwd, bcryptSalt)
        await user.save()
        const token = await generateToken(user)
        return res.status(200).json({
            status: 'success',
            message: 'A tua senha foi alterada.',
            data: {
                token
            }
        })
    } catch (err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.delete = async (req, res, next) => {
    try {
        const user = req.user
        await user.destroy()
        return res.status(200).json({
            status: 'success',
            message: 'A tua conta foi eliminada.'
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}