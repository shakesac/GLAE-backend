const helper = require('../util/contr.helpers')
const Cargo = require('../models/cargo.model')

exports.new = async (req, res) => {
    const { cargo } = req.body
    const newCargo = new Cargo({
        cargo
    })
    await helper.create(res, Cargo)
}

exports.update = async (req, res) => {
    await helper.checkIfByPkAndUpdate(res, Cargo, req.params.id, req.body)
}

exports.get = async (req, res) => {
    helper.checkIfByPkAndGet(res, Cargo, req.params.id)
}

exports.getAll = async (req, res) => {
    await helper.checkIfAndGetAll(res, Cargo)
}

exports.delete = async (req, res) => {
    await helper.delete(
        res,
        Cargo,
        req.params.id,
        Uers,
        'cargoId'
        )
}