const AppError = require('../util/appError')
const { Op } = require("sequelize");
const Section = require('../models/section.model')

exports.new = async (req, res, next) => {
    try {
        const { id, section } = req.body
        const exists = await Section.findOne({ where: {
            [Op.or]: [{ code }, { section }]
        }})
        if (exists) return next(new AppError('Já existe uma secção com o mesmo nome ou ID.', 400, 'failed'))
        else {
            await Section.create({ code, section })
            return res.status(201).json({
                status: 'success',
                message: 'A secção foi criada com sucesso.'
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.update = async (req, res, next) => {
    try {
        const { code, section } = req.body
        if (!code) {
            const exists = await Section.findOne({ where: {section}})
            if (exists) return next(new AppError('Já existe uma secção com o mesmo nome.', 400, 'failed'))
        } else if (!section) {
            const exists = await Section.findOne({ where: {code}})
            if (exists) return next(new AppError('Já existe uma secção com o mesmo código.', 400, 'failed'))
        } else if (!code && !section) {
            return next(new AppError('Input inválido.', 400, 'failed'))
        } 
        const thisSection = await Section.findByPk(req.params.id)
        if (!thisSection) return next(new AppError('Secção indicada não existe.', 404, 'not found'))
        await thisSection.update({ code, section })
        return res.status(200).json({
            status: 'success',
            message: 'A secção foi alterada com sucesso.'
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.get = async (req, res, next) => {
    try {
        const thisSection = await Section.findByPk(req.params.id)
        if (!thisSection) return next(new AppError('A secção indicada não existe.', 404, 'not found'))
        else return res.status(200).json({
            status: "success",
            data: thisSection
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.getSubs = async (req, res, next) => {
    try {
        const thisSection = await Section.findByPk(req.params.id)
        if (!thisSection) return next(new AppError('A secção indicada não existe.', 404, 'not found'))
        else {
            const subsections = await thisSection.getSubsections()
            return res.status(200).json({
                status: 'success',
                data: subsections
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const thisSections = await Section.findAll()
        if (thisSections.length < 1) return next(new AppError('Não existem secções.', 404, 'not found'))
        else return res.status(200).json({
            status: "success",
            data: thisSections
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.delete = async (req, res, next) => {
    try {
        const thisSection = await Section.findByPk(req.params.id)
        if (!thisSection) return next(new AppError('A secção indicada não existe.', 404, 'not found'))
        else if (await thisSection.countSubsections()) return next(new AppError('Existem subsecções dependentes desta secção.', 400, 'failed'))
        else {
            thisSection.destroy()
            return res.status(200).json({
                status: 'success',
                message: 'A secção foi eliminada.'
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}