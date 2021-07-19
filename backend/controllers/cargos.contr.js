const helper = require('../util/contr.helpers')
const Cargo = require('../models/cargo.model')

exports.new = async (req, res) => {
    const newCargo = new Cargo({
        cargo: req.body.cargo
    })
    await newCargo.save().then((cargo) => {
        res.status(201).json({
            status: 'success',
            message: 'O cargo foi criado com sucesso',
            data: cargo
        })
    }).catch((err) => {
        if (err.errors[0].message == 'cargos.cargo must be unique') {
            return res.status(400).json({
                status: 'failed',
                message: 'Já existe um cargo com o nome indicado.'
            })
        }
        res.status(400).json({
            status: 'fail',
            message: err.errors[0].message,
        })
    })
}

exports.update = async (req, res) => {
    const cargo = await Cargo.findByPk(req.params.id).catch((err) => {
        res.status(400).json({
            status: 'failed',
            message: err.errors[0].message,
        })
    })
    if (!cargo) {
        return res.status(400).json({
            status: 'failed',
            message: 'Cargo inexistente.'
        })
    }
    await Cargo.update({
        cargo: req.body.cargo,
    }, {
        where: { id: req.params.id }
    }).catch((err) => {
        console.log('Erro: ', err)
        res.status(202).json({
            status: 'fail',
            message: err.errors[0].message,
        })
    })
    res.status(200).json({
        status: 'success',
        message: 'Cargo actualizado com sucesso.',
    })
}

exports.get = async (req, res) => {
    const cargo = await Cargo.findByPk(req.params.id).catch((err) => {
        res.status(400).json({
            status: 'fail',
            message: err.errors[0].message,
        })
    })
    if (!cargo) {
        return res.status(400).json({
            status: 'failed',
            message: 'Cargo inexistente.'
        })
    }
    res.status(200).json({
        status: 'success',
        data: cargo
    })
}

exports.getAll = async (req, res) => {
    await helper.checkIfAndGetAll(res, Cargo)
}