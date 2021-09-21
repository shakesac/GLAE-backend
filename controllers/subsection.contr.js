const AppError = require('../util/appError')
const { Op } = require("sequelize")
const Section = require('../models/section.model')
const Subsection = require('../models/subsection.model')
const User = require('../models/user.model')

exports.new = async (req, res, next) => {
    try {
        const { code, subsection, sectionId } = req.body
        const section = await Section.findByPk(sectionId)
        if (!section) return next(new AppError('Não existe nenhuma secção com o código indicado.', 404, 'not found'))
        const exists = await Subsection.findOne({
            where: {
                [Op.and]: [{ code }, { sectionId }]
            },
            include: {
                model: Section,
                attributes: ['section']
            }
        })
        if (exists) return next(new AppError('Já existe um grupo com o mesmo código associado à secção ' + exists.section.section +'.', 400, 'failed'))
        const thisSubsection = await section.createSubsection({ code, subsection })
        return res.status(201).json({
            status: 'success',
            message: `O grupo ${thisSubsection.subsection} foi criado com sucesso.`
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.update = async (req, res, next) => {
    try {
        const { code, subsection, sectionId } = req.body
        const thisSubsection = await Subsection.findByPk(req.params.id)
        if (!thisSubsection) return next(new AppError('O grupo indicado não existe.', 400, 'failed'))
        if (code !== thisSubsection.code || sectionId !== thisSubsection.sectionId) {
            const exists = await Subsection.findOne({ where: {
                id: {
                    [Op.ne]: req.params.id
                },
                [Op.and]: [{code}, {sectionId}]
            }})
            if (exists) return next(new AppError('Já existe um grupo com o mesmo código na secção indicada.', 400, 'failed'))
        }
        await thisSubsection.update({ code, subsection, sectionId })
        return res.status(200).json({
            status: 'success',
            message: 'O grupo foi alterado com sucesso.'
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.get = async (req, res, next) => {
    try {
        const thisSubsection = await Subsection.findByPk(req.params.id)
        if (!thisSubsection) return next(new AppError('O grupo indicado não existe.', 404, 'not found'))
        else return res.status(200).json({
            status: "success",
            data: thisSubsection
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const { section } = req.query
        let options
        if (section) {
            options = {
                where: {
                    sectionId: section
                },
                include: [{
                    model: Section,
                    attributes: ['section']
                }],
                order: ['sectionId', 'code']
            }
        } else {
            options = {
                include: [{
                    model: Section,
                    attributes: ['section']
                }],
                order: ['sectionId', 'code']
            }
        }
        const subsections = await Subsection.findAll(options)
        if (subsections.length < 1) return next(new AppError('Não existem grupos.', 404, 'not found'))
        else return res.status(200).json({
            status: "success",
            data: subsections
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.getSection = async (req, res, next) => {
    try {
        const thisSubsection = await Subsection.findByPk(req.params.id)
        if (!thisSubsection) return next(new AppError('O grupo indicado não existe.', 404, 'not found'))
        else {
            const thisSection = await thisSubsection.getSection()
            return res.status(200).json({
                status: 'success',
                data: thisSection
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.getUsers = async (req, res, next) => {
    try {
        const thisSubsection = await Subsection.findByPk(req.params.id)
        if (!thisSubsection) return next(new AppError('O grupo indicado não existe.', 404, 'not found'))
        else {
            let options = {attributes: { exclude: ['password', 'updatedAt', 'subsectionId'] }}
            const users = await thisSubsection.getUsers(options)
            if (users.length < 1) return next(new AppError('Não existem utilizadores associados a este grupo.', 404, 'not found'))
            else return res.status(200).json({
                status: 'success',
                data: users
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.addUser = async (req, res, next) => {
    try {
        const userId = req.params.uid
        if (!userId) return next(new AppError('É necessário indicar o ID do utilizador.', 400, 'failed'))
        const thisSubsection = await Subsection.findByPk(req.params.id)
        const user = await User.findByPk(userId)
        if (!thisSubsection) return next(new AppError('A subsecção indicada não existe.', 404, 'not found'))
        else if (!user) return next(new AppError('O utilizador indicado não existe.', 404, 'not found'))
        else {
            await user.setSubsection(thisSubsection)
            return res.status(200).json({
                status: 'success',
                message: `O utilizador foi adicionado a ${thisSubsection.subsection}.`
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.removeUser = async (req, res, next) => {
    try {
        const userId = req.params.uid
        if (!userId) return next(new AppError('É necessário indicar o ID do utilizador.', 400, 'failed'))
        const thisSubsection = await Subsection.findByPk(req.params.id)
        const user = await User.findByPk(userId)
        if (!thisSubsection) return next(new AppError('A subsecção indicada não existe.', 404, 'not found'))
        else if (!user) return next(new AppError('O utilizador indicado não existe.', 404, 'not found'))
        else if (!await thisSubsection.hasUser(user)) {
            return next(new AppError('O utilizador indicado não está associado à subsecção indicada.', 404, 'not found'))
        }
        else {
            await thisSubsection.removeUser(user)
            return res.status(200).json({
                status: 'success',
                message: `O utilizador foi removido de ${thisSubsection.subsection}.`
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.delete = async (req, res, next) => {
    try {
        const thisSubsection = await Subsection.findByPk(req.params.id)
        if (!thisSubsection) return next(new AppError('O grupo indicado não existe.', 404, 'not found'))
        else if (await thisSubsection.countUsers()) return next(new AppError('Existem utilizadores associados a este grupo.', 400, 'failed'))
        else {
            thisSubsection.destroy()
            return res.status(200).json({
                status: 'success',
                message: 'O grupo foi eliminado.'
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}