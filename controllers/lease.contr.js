const AppError = require('../util/appError')
const { Op } = require("sequelize");
const helper = require('../util/contr.helpers')
const LeaseStatus = require('../models/lease-status.model')
const Lease = require('../models/lease.model');
const User = require("../models/user.model");
const Item = require('../models/item.model');
const availableStatus = process.env.LEASE_STATUS.split(',')
const unmutableStatus = process.env.UNMUTABLE_STATUS.split(',')

exports.new = async (req, res, next) => {
    try {
        const { start, end, items, userId } = req.body
        const uId = userId || req.user.id
        const user = await User.findByPk(uId)
        if (!user) return next(new AppError('O utilizador indicado não existe.', 404, 'not found'))
        else if (start < Date.now()) {
            return next(new AppError('Não é possivel colocar pedidos a iniciar no passado.', 400, 'failed'))
        } else if (start > end) {
            return next(new AppError('Não é possivel colocar pedidos a iniciar antes da data de término.', 400, 'failed'))
        } else if (!Array.isArray(items) || items.length < 1) {
            return next(new AppError('Não é possivel criar emprestimos sem itens.', 400, 'failed'))
        }
        const newLease = await user.createLease({ start, end })
        for (let i of items) {
            const item = await Item.findByPk(i)
            if (!item) {
                newLease.destroy()
                return next(new AppError('Um dos itens adicionados não existe.', 400, 'failed'))
            } else await newLease.addItem(i)
        }
        await newLease.createLease_status({ status: 'pending', isActive: true })
        return res.status(200).json({
            status: 'success',
            message: 'Emprestimo criado.'
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.update = async (req, res) => {
    await helper.checkIfByPkAndUpdate(res, Lease, req.params.id, req.body)
}

exports.getAll = async (req, res, next) => {
    try {
        const {page, status, limit} = req.query
        let options
        if (status && (!page || !limit)) {
            if (!availableStatus.includes(status) && !status) {
                return next(new AppError('O estado indicado é inválido.', 400, 'failed'))
            }
            options = {
            include: [{
                model: LeaseStatus,
                attributes: ['status'],
                where: {
                    status: status,
                    isActive: true
                }
            },{
                model: User,
                attributes: ['firstName', 'lastName','fullName']
            }],
            order: [['createdAt', 'DESC']]
        }}
        else if (!status && (page && limit)) {
            const offset = page * limit
            options = {
                include: [{
                    model: LeaseStatus,
                    attributes: ['status'],
                    where: {
                        isActive: true
                    }
                },{
                    model: User,
                    attributes: ['firstName', 'lastName','fullName']
                }],
                offset: offset,
                limit: parseInt(limit, 10),
                order: [['createdAt', 'DESC']],
            }
        } else if (status && (page && limit)) {
            if (!availableStatus.includes(status) && !status) {
                return next(new AppError('O estado indicado é inválido.', 400, 'failed'))
            }
            const offset = page * limit
            options = {
                include: [{
                    model: LeaseStatus,
                    where: {
                        status: status,
                        isActive: true
                    }
                },{
                    model: User,
                    attributes: ['firstName', 'lastName','fullName']
                }],
                limit: parseInt(limit, 10),
                offset: offset,
                order: [['createdAt', 'DESC']],
            }
        }
        else {
            options = {
                include: [{
                    model: LeaseStatus,
                    attributes: ['status'],
                    where: {
                        isActive: true
                    }
                },{
                    model: User,
                    attributes: ['firstName', 'lastName','fullName']
                }],
                order: [['createdAt', 'DESC']]}
        }
        const leases = await Lease.findAll(options)
        if (leases.length < 1) return next(new AppError('Não existem emprestimos.', 404, 'not found'))
        else return res.status(200).json({
            status: 'success',
            data: leases
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.getItems = async (req, res, next) => {
    try {
        const lease = await Lease.findByPk(req.params.id)
        if (!lease) return next(new AppError('O emprestimo indicado não existe.', 404, 'not found'))
        else {
            const options = {order: ['typeId', 'createdAt']}
            const items = await lease.getItems()
            console.log(items)
            if (items.length < 1) return next(new AppError('O emprestimo não tem material associado.', 404, 'not found'))
            return res.status(200).json({
                status: 'success',
                data: items
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error')) 
    }
}

exports.removeItem = async (req, res, next) => {
    try {
        const options = {
            include: [{
                model: LeaseStatus,
                where: {
                    isActive: true
                },
                attributes: ['status']
            }]
        }
        const lease = await Lease.findByPk(req.params.id, options)
        if (!lease) return next(new AppError('O emprestimo indicado não existe.', 404, 'not found'))
        const valid = await verifyStatus(lease)
        if (!valid) return next(new AppError('Não é possível alterar emprestimos arquivados ou em progresso.', 400, 'not found'))
        const item = await Item.findByPk(req.params.iid)
        if (!item) return next(new AppError('O item indicado não existe.', 404, 'not found'))
        const thisItem = await lease.hasItem(item)
        if (!thisItem) return next(new AppError('O item indicado não está neste emprestimo.', 404, 'not found'))
        const count = await lease.countItems()
        if (count < 2) return next(new AppError('O emprestimo tem de conter pelo menos um artigo.', 400, 'failed'))
        await lease.removeItem(item)
        return res.status(200).json({
            status: 'success',
            message: 'O item foi removido deste emprestimo.'
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error')) 
    }
}

exports.get = async (req, res, next) => {
    try {
        const lease = await Lease.findByPk(req.params.id)
        if (!lease) return next(new AppError('O emprestimo indicado não existe.', 404, 'not found'))
        else return res.status(200).json({
            status: "success",
            data: lease
        })
    } catch(err){
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.updateStatus = async (req, res, next) => {
    try {
        const { status, comment } = req.body
        const leaseId = req.params.id
        const lease = await Lease.findByPk(leaseId)
        if (!lease) return next(new AppError('O emprestimo indicado não existe.'))
        // Verificar se o emprestimo já terminou ou foi cancelado.
        //SELECT * FROM lease_status WHERE leaseId = {leaseId} AND status = 'returned' OR status = 'canceled';
        let options = { where: {
            status: {
                [Op.or]: unmutableStatus
            }
        }}
        const isFinished = await lease.getLease_statuses(options)
        if (isFinished.legth > 0) return next(new AppError('Não é possivel adicionar estados a este emprestimo por este já ter terminado ou ter sido cancelado.', 400, 'failed'))
        options = { where: {
            [Op.and]: [{isActive:true}, {leaseId: lease.id}]
        }}
        await lease.createLease_status({
            status, comment
        })
        const lastStatus = await LeaseStatus.findOne(options)
        await lastStatus.update({isActive: false})
        return res.status(201).json({
            status: 'success',
            message: `O estado de encomenda foi alterado para ${status}`
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.getStatusHistory = async (req, res, next) => {
    try {
        const lease = await Lease.findByPk(req.params.id)
        if (!lease) return next(new AppError('O emprestimo indicado não existe.', 404, 'not found'))
        const options = {
            order: [['createdAt', 'DESC']]
        }
        const status = await lease.getLease_statuses(options)
        return res.status(200).json({
            status: 'success',
            data: status
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

const verifyStatus = async (lease) => {
    let valid = false
    const leaseStatus = await lease.getLease_statuses({where: {isActive:true}})
    switch(leaseStatus[0].status) {
        case 'accepted':
            valid = true
            break
        case 'inProgress':
            valid = false
            break
        case 'canceled':
            valid = false
            break
        case 'refused':
            valid = false
            break
        case 'pending':
            valid = true
            break
        case 'returned':
            valid = false
            break
    }
    return valid
}