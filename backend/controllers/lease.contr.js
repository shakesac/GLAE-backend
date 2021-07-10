const Lease = require('../models/lease.model')

exports.new = async (req, res) => {
    const newLease = new Lease({
        start: req.body.start,
        end: req.body.end,
        userId: req.body.userId
    })
    await newLease.save().catch((err) => {
        console.log('Error ', err)
        res.status(202).json({
            status: 'fail',
            message: 'Ocorreu um erro ao criar emprestimo',
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
            message: 'Ocorreu um erro ao actualizar o emprestimo'
        })
    })
    res.status(201).json({
        status: 'success',
        message: 'O emprestimo foi actualizado com sucesso'
    })
}

exports.editStatus = async (req, res) => {
    const verifyLease = await Lease.update({
        start: req.body.start,
        end: req.body.end
    }, {
        where: { id: req.params.id }
    })
}

exports.getAll = async (req, res) => {
    const leases = await Lease.findAll().then((result) => {
        res.status(200).json({
            status: 'success',
            data: {
                data: result
            }
        })
    }).catch((err) => {
        console.log('Erro: ', err)
        res.status(202).json({
            status: 'fail',
            message: 'Ocorreu um erro ao listar emprestimos'
        })
    })

}

exports.get = async (req, res) => {
    await Lease.findByPk(req.params.id).then((lease) => {
        res.status(200).json({
            status: 'success',
            data: lease
        })
    }).catch((err) => {
        console.log('Erro: ', err)
        res.status(202).json({
            status: 'fail',
            message: 'Ocorreu um erro ao obter o emprestimo'
        })
    })
}