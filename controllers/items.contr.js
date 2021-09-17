const AppError = require('../util/appError')
const { Op } = require("sequelize");
const Item = require('../models/item.model')
const ItemType = require('../models/item-type.model');
const User = require('../models/user.model');
const ItemCategory = require('../models/item-cat.model');

exports.new = async (req, res, next) => {
    try {
        const {name, description, purchasedAt, typeId} = req.body
        const user = await User.findByPk(req.user.id)
        const type = await ItemType.findByPk(typeId)
        if (!type) return next(new AppError('Não existe nenhum tipo de item com o ID indicado.', 404, 'not found'))
        const thisItem = await type.createItem({
            name, description, purchasedAt
        })
        await thisItem.setUser(user)
        return res.status(201).json({
            status: 'success',
            message: `O item ${thisItem.name} foi criado.`
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.update = async (req, res, next) => {
    try {
        const { name, description } = req.body
        const thisItem = await Item.findByPk(req.params.id)
        if (!thisItem) return next(new AppError('O item indicado não existe.', 404, 'not found'))
        else {
            await thisItem.update({
                name, description
            })
            return res.status(200).json({
                status: "success",
                message: "O item foi alterado."
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.get = async (req, res, next) => {
    //const options = {include: ItemType}
    try {
        const options = {include: [{
            model: ItemType,
            attributes: ['type'],
            include: [{
                model: ItemCategory,
                attributes: ['id','code']
            }]
        }]}
        const thisItem = await Item.findByPk(req.params.id, options)
        if (!thisItem) return next(new AppError('O item indicado não existe.', 404, 'not found'))
        else return res.status(200).json({
            status: "success",
            data: thisItem
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const { category } = req.query
        let options
        if (category) {
            options = { where: {endOfLife: false}, include: [{
                model: ItemType,
                where: { categoryId: category },
                attributes: ['type', 'code'],
                include: [{
                    model: ItemCategory,
                    attributes: ['id','code']
                }]
            }]}
        } else {
            options = { where: {endOfLife: false}, include: [{
                model: ItemType,
                attributes: ['type'],
                include: [{
                    model: ItemCategory,
                    attributes: ['id','code']
                }]
            }]}
        }
        const items = await Item.findAll(options)
        if (items.length < 1) return next(new AppError('Não existem itens.', 404, 'not found'))
        else return res.status(200).json({
            status: "success",
            data: items
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.getAllAvailable = async (req, res, next) => {
    try {
        const { category } = req.query
        let options
        if (category) {
            options = { where: {endOfLife: false}, include: [{
                model: ItemType,
                where: { categoryId: category },
                attributes: ['type']
            }] }
        } else {
            options = { where: {endOfLife: false}, include: [{
                model: ItemType,
                attributes: ['type']
            }] }
        }
        const items = await Item.findAll(options)
        if (items.length < 1) return next(new AppError('Não existem itens.', 404, 'not found'))
        else return res.status(200).json({
            status: "success",
            data: items
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.history = async (req, res, next) => {
    try {
        const options = { where: {endOfLife: true}}
        const items = await Item.findAll(options)
        if (items.length < 1) return next(new AppError('Não existem itens arquivados.', 404, 'not found'))
        else return res.status(200).json({
            status: "success",
            data: items
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.endOfLife = async (req, res, next) => {
    try {
        const thisItem = await Item.findByPk(req.params.id)
        if (!thisItem) return next(new AppError('O item indicado não existe.', 404, 'not found'))
        else {
            thisItem.update({ endOfLife: true})
            return res.status(200).json({
                status: 'success',
                message: 'O item foi arquivado.'
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.delete = async (req, res, next) => {
    try {
        const thisItem = await Item.findByPk(req.params.id)
        if (!thisItem) return next(new AppError('O item indicado não existe.', 404, 'not found'))
        else if (await thisItem.countLeases()) return next(new AppError('Existem emprestimos associados a este item.', 400, 'failed'))
        else {
            thisItem.destroy()
            return res.status(200).json({
                status: 'success',
                message: 'O item foi eliminado.'
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}