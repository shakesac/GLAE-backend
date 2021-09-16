const AppError = require('../util/appError')
const { Op } = require("sequelize")
const ItemInspect = require('../models/item-inspect.model')
const Item = require('../models/item.model')

exports.new = async (req, res, next) => {
    try {
        const itemId = req.params.id
        const { description } = req.body
        const item = await Item.findByPk(itemId)
        if (!item) return next(new AppError('O item indicado não existe.', 404, 'not found'))
        await item.createItem_inspection({ description })
        return res.status(200).json({
            status: "success",
            message: "A inspecção do item foi criada."
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.get = async (req, res, next) => {
    //const options = {include: ItemType}
    try {
        const inspect = await ItemInspect.findByPk(req.params.id)
        if (!inspect) return next(new AppError('A inspecção indicada não existe.', 404, 'not found'))
        else {
            return res.status(200).json({
                status: "success",
                data: inspect
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const item = await Item.findByPk(req.params.id)
        if (!item) return next(new AppError('O item indicado não existe.', 404, 'not found'))
        const inspects = await item.getItem_inspections()
        if (items.length < 1) return next(new AppError('Este item nunca foi inspeccionado.', 404, 'not found'))
        else return res.status(200).json({
            status: "success",
            data: inspects
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.update = async (req, res, next) => {
    try {
        const inspect = await ItemInspect.findByPk(req.params.id)
        if (!inspect) return next(new AppError('A inspecção indicada não existe.', 404, 'not found'))
        else {
            await inspect.update({description})
            return res.status(200).json({
                status: "success",
                message: "A descrição da inspecção foi alterada."
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}