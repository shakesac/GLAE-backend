const AppError = require('../util/appError')
const { Op } = require("sequelize");
const ItemType = require('../models/item-type.model')
const ItemCategory = require('../models/item-cat.model')
const Item = require('../models/item.model')

exports.new = async (req, res, next) => {
    try {
        const { code, type, categoryId } = req.body
        const category = await ItemCategory.findByPk(categoryId)
        if (!category) return next(new AppError('Não existe nenhuma categoria com o código indicado.', 404, 'not found'))
        const exists = await ItemType.findOne({ where: {
            [Op.or]: {
                [Op.and]: [{ code }, { type }, { categoryId }],
                [Op.and]: [{ code }, { categoryId }],
                [Op.and]: [{ type }, { categoryId }]
            }
        }})
        if (exists) return next(new AppError('Já existe um tipo de item com as mesmas caracteristicas.', 400, 'failed'))
        const thisType = await category.createItem_type({ code, type })
        return res.status(201).json({
            status: 'success',
            message: `O tipo de item ${thisType.type} foi criada.`
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.update = async (req, res, next) => {
    try {
        const { code, type } = req.body
        const thisType = await ItemType.findByPk(req.params.id)
        if (!thisType) return next(new AppError('O tipo de item indicado não existe.', 404, 'not found'))
        const categoryId = thisType.categoryId
        const exists = await ItemType.findOne({ where: {
            [Op.or]: {
                [Op.and]: [{ code }, { type }, { categoryId }],
                [Op.and]: [{ code }, { categoryId }],
                [Op.and]: [{ type }, { categoryId }]
            }
        }})
        if (exists) return next(new AppError('Existe um tipo de item com as mesmas caracteristicas.', 400, 'failed'))
        else {
            await thisType.update({
                code, type
            })
            return res.status(200).json({
                status: "success",
                message: "O tipo de item foi alterado."
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.get = async (req, res, next) => {
    //const options = {include: ItemCategory, exclude: ['itemCategoryId']}
    try {
        const type = await ItemType.findByPk(req.params.id)
        if (!type) return next(new AppError('O tipo de item indicado não existe.', 404, 'not found'))
        else return res.status(200).json({
            status: "success",
            data: type
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.getAll = async (req, res) => {
    //const options = {include: ItemCategory, exclude: ['itemCategoryId']}
    try {
        const types = await ItemType.findAll()
        if (types.length < 1) return next(new AppError('Não existem tipos de item.', 404, 'not found'))
        else return res.status(200).json({
            status: "success",
            data: types
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.addItem = async (req, res, next) => {
    try {
        const itemId = req.params.iid
        if (!itemId) return next(new AppError('É necessário indicar o ID do item.', 400, 'failed'))
        const type = await ItemType.findByPk(req.params.id)
        const item = await Item.findByPk(itemId)
        if (!type) return next(new AppError('O tipo indicado não existe.', 404, 'not found'))
        else if (!item) return next(new AppError('O item indicado não existe.', 404, 'not found'))
        else {
            await item.setItem_type(type)
            return res.status(200).json({
                status: 'success',
                message: `O item foi adicionado ao tipo ${type.type}.`
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.removeItem = async (req, res, next) => {
    try {
        const itemId = req.params.iid
        if (!itemId) return next(new AppError('É necessário indicar o ID do item.', 400, 'failed'))
        const type = await ItemType.findByPk(req.params.id)
        const item = await Item.findByPk(itemId)
        if (!type) return next(new AppError('O tipo indicado não existe.', 404, 'not found'))
        else if (!item) return next(new AppError('O item indicado não existe.', 404, 'not found'))
        else if (!await type.hasUser(item)) {
            return next(new AppError('O item indicado não está associado ao tipo indicado.', 404, 'not found'))
        }
        else {
            await type.removeUser(item)
            return res.status(200).json({
                status: 'success',
                message: `O item foi removido de ${type.type}.`
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.delete = async (req, res, next) => {
    try {
        const type = await ItemType.findByPk(req.params.id)
        if (!type) return next(new AppError('O tipo indicado não existe.', 404, 'not found'))
        else if (await type.countItems()) return next(new AppError('Existem itens associados a este tipo.', 400, 'failed'))
        else {
            type.destroy()
            return res.status(200).json({
                status: 'success',
                message: 'O tipo de item foi eliminado.'
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}