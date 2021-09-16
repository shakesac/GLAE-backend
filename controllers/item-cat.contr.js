const AppError = require('../util/appError')
const { Op } = require("sequelize");
const Category = require('../models/item-cat.model')

exports.new = async (req, res, next) => {
    try {
        const { code, category } = req.body
        const exists = await Category.findOne({ where: {
            [Op.or]: [{ code }, { category }]
        }})
        if (exists) return next(new AppError('Já existe uma categoria com o mesmo código ou nome.', 400, 'failed'))
        else {
            await Category.create({ code, category })
            return res.status(201).json({
                status: 'success',
                message: `A categoria ${category} foi criada com sucesso.`
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.update = async (req, res, next) => {
    try {
        const { code, category } = req.body
        if (!code) {
            const exists = await Category.findOne({ where: {category}})
            console.log(exists)
            if (exists) return next(new AppError('Já existe uma categoria com o mesmo nome.', 400, 'failed'))
        } else if (!category) {
            const exists = await Category.findOne({ where: {code}})
            if (exists) return next(new AppError('Já existe uma categoria com o mesmo ID.', 400, 'failed'))
        } else if (!code && !category) {
            return next(new AppError('Input inválido.', 400, 'failed'))
        }
        const thisCategory = await Category.findByPk(req.params.id)
        if (!thisCategory) return next(new AppError('A categoria indicada não existe.', 404, 'not found'))
        const exists = await Category.findOne({ where: {
            [Op.or]: [{ code }, { category }]
        }})
        if (exists) return next(new AppError('Já existe uma categoria com as mesmas características.', 400, 'failed'))
        await thisCategory.update({ code, category })
        return res.status(200).json({
            status: 'success',
            message: 'A categoria foi alterada com sucesso.'
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.get = async (req, res, next) => {
    try {
        const thisCategory = await Category.findByPk(req.params.id)
        if (!thisCategory) return next(new AppError('A categoria indicada não existe.', 404, 'not found'))
        else return res.status(200).json({
            status: "success",
            data: thisCategory
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const categories = await Category.findAll()
        if (categories.length < 1) return next(new AppError('Não existem categorias.', 404, 'not found'))
        else return res.status(200).json({
            status: "success",
            data: categories
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.getTypes = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id)
        if (!category) return next(new AppError('A categoria indicada não existe.', 404, 'not found'))
        else {
            const options = {attributes: { exclude: ['createdAt', 'categoryId'] }}
            const types = await category.getItem_types(options)
            return res.status(200).json({
                status: 'success',
                data: types
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.delete = async (req, res, next) => {
    try {
        const thisCategory = await Category.findByPk(req.params.id)
        if (!thisCategory) return next(new AppError('A categoria indicada não existe.', 404, 'not found'))
        else if (await thisCategory.countItem_types()) return next(new AppError('Existem tipos de item dependentes desta categoria.', 400, 'failed'))
        else {
            thisCategory.destroy()
            return res.status(200).json({
                status: 'success',
                message: 'A categoria foi eliminada.'
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}