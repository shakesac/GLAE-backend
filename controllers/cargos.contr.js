const AppError = require('../util/appError')
const { Op } = require("sequelize")
const Cargo = require('../models/cargo.model')

exports.new = async (req, res, next) => {
    try {
        const { cargo } = req.body
        await Cargo.create({
            cargo
        })
        res.status(201).json({
            status: 'success',
            message: 'O cargo foi criado com sucesso.'
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.update = async (req, res, next) => {
    try {
        const { cargo } = req.body
        const cargoId = req.params.id
        const result = await Cargo.update({ cargo }, { where: { id: cargoId }})
        if (result[0] > 0) {
            return res.status(200).json({
                status: 'success',
                message: 'O cargo foi alterado.'
            })
        }
        else return next(new AppError('Não foram efetuadas alterações.', 400, 'failed'))
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.get = async (req, res, next) => {
    try {
        const cargo = await Cargo.findByPk(req.params.id)
        if (!cargo) return next(new AppError('O cargo indicado não existe.', 404, 'not found'))
        else return res.status(200).json({
            status: "success",
            data: cargo
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const cargos = await Cargo.findAll()
        if (!cargos) return next(new AppError('Não existem cargos.', 404, 'not found'))
        else return res.status(200).json({
            status: "success",
            data: cargos
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.delete = async (req, res, next) => {
    try {
        const cargo = await Cargo.findByPk(req.params.id)
        if (!cargo) return next(new AppError('O cargo indicado não existe.', 404, 'not found'))
        else {
            cargo.destroy()
            return res.status(200).json({
                status: 'success',
                message: 'O cargo foi eliminado.'
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}