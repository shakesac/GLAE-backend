const { Op } = require("sequelize");
const helper = require('../util/contr.helpers')
const LeaseStatus = require('../models/lease-status.model')
const Lease = require('../models/lease.model');
const User = require("../models/user.model");
const availableStatus = process.env.LEASE_STATUS.split(',')
const unmutableStatus = process.env.UNMUTABLE_STATUS.split(',')


exports.new = async (req, res) => {
    const { start, end } = req.body
    if (start < Date.now()) {
        return res.status(400).json({
            status: 'failed',
            message: 'Não é possivel colocar pedidos a iniciar no passado.',
        })
    } else if (start > end) {
        return res.status(400).json({
            status: 'failed',
            message: 'Não é possivel colocar pedidos a iniciar antes da data de término.',
        })
    }
    const newLease = new Lease({
        start,
        end,
        userId: req.user.id
    })
    const lease = await newLease.save().catch((err) => {
        res.status(400).json({
            status: 'failed',
            message: err.errors[0].message,
        })
    })
    const status = new LeaseStatus({
        leaseId: lease.id
    })
    await status.save().catch(err => {
        res.status(400).json({
            status: 'failed',
            message: 'Não foi possível criar o estado do emprestimo.'
        })
    })
    res.status(201).json({
        status: 'success',
        message: 'O emprestimo foi criado com sucesso',
        leaseId: newLease
    })
}

exports.update = async (req, res) => {
    await helper.checkIfByPkAndUpdate(res, Lease, req.params.id, req.body)
}

exports.getAll = async (req, res) => {
    const options = {include: LeaseStatus}
    await helper.checkIfAndGetAll(res, Lease, options)
}

exports.getAllFromUser = async (req, res) => {
    const { id } = req.user.dataValues
    const leases = await Lease.findAll({
        where: {
            userId: id
        },
        include: [{
            model: LeaseStatus
        }]
    }).then((userLeases) => {
        if (!userLeases) {
            return res.status(202).json({
                status: 'success',
                message: 'Não existem emprestimos.',
            })
        }
        res.status(200).json({
            status: 'success',
            data: userLeases
        })
    }).catch((err) => {
        res.status(202).json({
            status: 'fail',
            message: err.errors[0].message,
        })
    })
}

exports.get = async (req, res) => {
    const options = {include: LeaseStatus}
    await helper.checkIfAndGet(res, Lease, req.params.id, options)
}

exports.getAllIfStatus = async (req, res) => {
    console.log(availableStatus)
    if (!availableStatus.includes(req.params.status)){
        return res.status(400).json({
            status: 'failed',
            message: 'Estado indicado não existe.'
        })
    }
    const options = {
        //order: [LeaseStatus, 'createdBy', 'DESC'],
        include: [{
            model: LeaseStatus,
            where: { 
                [Op.and]: [
                    {
                        status: req.params.status,
                        isActive: true
                     }
                ]
            }
        },{
            model: User,
            attibutes: ['firstName, lastName, email']
        }],
    }
    /*
    const options = { 
        include: [{
            model: LeaseStatus,
            //as: 'status',
            where: { status: req.params.status },
        },{ 
            model: User,
            through: {
                attibutes: ['firstName, lastName, email']
            }
        }],
    }
        */
    await helper.checkIfAndGetAll(res, Lease, options)
}


exports.updateStatus = async (req, res) => {
    const { status, comment } = req.body
    const leaseId = req.params.id
    // Verificar se o emprestimo existe
    const lease = await Lease.findByPk(leaseId).catch(err => {
        return res.status(400).json({
            status: 'failed',
            message: err.errors[0].message
        })
    })
    if (!lease) {
        return res.status(404).json({
            status: 'failed',
            message: 'Não é possível adicionar um estado. O emprestimo não existe.'
        })
    }
    // Verificar se o emprestimo já terminou ou foi cancelado.
    //SELECT * FROM lease_status WHERE leaseId = {leaseId} AND status = 'returned' OR status = 'canceled';
    const checkLease = await LeaseStatus.findOne({
        where: {
            leaseId,
            status: {
                [Op.or]: unmutableStatus
            }
        }
    })
    if (checkLease){
        return res.status(400).json({
            status: 'failed',
            message: 'Não é possivel adicionar estados a este emprestimo por este já ter terminado ou ter sido cancelado.'
        })
    }
    // Verificar o ultimo estado
    const lastStatus = await LeaseStatus.findOne({
        where: { 
            [Op.and]: [
                {
                    leaseId,
                    isActive: true
                 }
            ]
        }
    })
    if (lastStatus) {
        await LeaseStatus.update({
            isActive: false
        },{
            where: { leaseId }
        })
    }
    LeaseStatus.create({
        status,
        leaseId,
        comment
    }).then(() => {
        res.status(201).json({
            status: 'success',
            message: 'Estado de encomenda alterado com sucesso.',
        })
    }).catch(err => {
        res.status(400).json({
            status: 'failed',
            message: err.errors[0].message
        })
    })
}