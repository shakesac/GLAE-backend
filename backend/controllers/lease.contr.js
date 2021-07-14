const { Op } = require("sequelize");
const LeaseStatus = require('../models/lease-status.model')
const Lease = require('../models/lease.model')

exports.new = async (req, res) => {
    const newLease = new Lease({
        start: req.body.start,
        end: req.body.end,
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
        leaseId: newLease.id
    })
}

exports.update = async (req, res) => {
    await Lease.update({
        start: req.body.start,
        end: req.body.end
    }, {
        where: { id: req.params.id}
    }).catch((err) => {
        console.log('Erro: ', err)
        res.status(304).json({
            status: 'fail',
            message: err.errors[0].message,
        })
    })
    res.status(201).json({
        status: 'success',
        message: 'O emprestimo foi actualizado com sucesso'
    })
}

exports.getAll = async (req, res) => {
    const leases = await Lease.findAll({
        include: [{
            model: LeaseStatus
        }]
    }).then((result) => {
        res.status(200).json({
            status: 'success',
            data: result
        })
    }).catch((err) => {
        console.log('Erro: ', err)
        res.status(202).json({
            status: 'fail',
            message: err.errors[0].message,
        })
    })
}

exports.get = async (req, res) => {
    await Lease.findByPk(req.params.id, {
        include: [{
            model: LeaseStatus
        }]
    }).then((lease) => {
        res.status(200).json({
            status: 'success',
            data: lease
        })
    }).catch((err) => {
        console.log('Erro: ', err)
        res.status(202).json({
            status: 'fail',
            message: err.errors[0].message,
        })
    })
}

exports.updateStatus = async (req, res) => {
    const { status } = req.body
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
    LeaseStatus.findOne({
        where: {
            leaseId,
            status: {
                [Op.or]: ['returned', 'canceled']
            }
        }
    }).then(status => {
        if (status) {
            return res.status(400).json({
                status: 'failed',
                message: 'Não é possivel adicionar estados a este emprestimo por \
                este já ter terminado ou ter sido cancelado.'
            })
        } else {
            const newStatus = new LeaseStatus({
                status,
                leaseId
            })
            return newStatus.save().catch(err => {
                res.status(400).json({
                    status: 'failed',
                    message: err.errors[0].message,
                })
            })
        }
    }).catch(err => {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    })
}