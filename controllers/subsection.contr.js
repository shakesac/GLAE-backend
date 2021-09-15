const AppError = require('../util/appError')
const { Op } = require("sequelize");
const helper = require('../util/contr.helpers')
const Section = require('../models/section.model')
const Subsection = require('../models/subsection.model')

exports.new = async (req, res, next) => {
    try {
        const { code, subsection, sectionId } = req.body
        const section = await Section.findByPk(sectionId)
        if (!section) return next(new AppError('Não existe nenhuma secção com o código indicado.', 404, 'not found'))
        const exists = await Subsection.findOne({ where: {
            [Op.and]: [{ code }, { subsection }, { sectionId }]
        }})
        if (exists) return next(new AppError('Já existe uma subsecção com as mesmas caracteristicas.', 400, 'failed'))
        const thisSubsection = await section.createSubsection({ id, subsection })
        return res.status(201).json({
            status: 'success',
            message: `A subsecção ${thisSubsection.subsection} foi criada.`
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.update = async (req, res, next) => {
    try {
        const { code, subsection } = req.body
        const thisSubsection = await Subsection.findByPk(req.params.id)
        if (!thisSubsection) return next(new AppError('A subsecção indicada não existe.', 400, 'failed'))
        if (!code) {
            const exists = await Subsection.findOne({ where: { [Op.and]: [
                {subsection}, { sectionId: thisSubsection.sectionId }
            ]}})
            if (exists) return next(new AppError('Já existe uma subsecção com o mesmo nome.', 400, 'failed'))
        } else if (!subsection) {
            const exists = await Subsection.findOne({ where: { [Op.and]: [
                { code }, { sectionId: thisSubsection.sectionId }
            ]}})
            if (exists) return next(new AppError('Já existe uma subsecção com o mesmo ID.', 400, 'failed'))
        } else if (!id && !subsection) {
            return next(new AppError('Input inválido.', 400, 'failed'))
        }
        await thisSubsection.update({ code, subsection })
        return res.status(200).json({
            status: 'success',
            message: 'A secção foi alterada com sucesso.'
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
    
    // Verificar se secção existe
    const sectionExists = await Section.findByPk(sectionId).catch(err => {
        return res.status(400).json({
            status: 'failed',
            message: err.errors[0].message,
        })
    })
    if (!sectionExists) {
        return res.status(400).json({
            status: 'failed',
            message: 'Não existe nenhuma secção com o código indicado.'
        })
    }
    await Subsection.update({
        id,
        subsection,
        sectionId
    }, {
        where: { id: req.params.id }
    }).then(() => {
        res.status(200).json({
            status: 'success',
            message: 'O grupo foi actualizado com sucesso.',
        })
    }).catch((err) => {
        console.log('Erro: ', err)
        res.status(400).json({
            status: 'failed',
            message: err.errors[0].message,
        })
    })
}

exports.get = async (req, res) => {
    const options = {include: Section, exclude: ['sectionId']}
    helper.checkIfByPkAndGet(res, Subsection, req.params.id, options)
}

exports.getAll = async (req, res) => {
    const options = {include: Section, exclude: ['sectionId']}
    helper.checkIfAndGetAll(res, Subsection, options)
}

exports.getAllFromSection = async (req, res) => {
    console.log(req.params)
    await Subsection.findAll({
        where: {
            sectionId: req.params.id
        }
    }).then((subsections) => {
        res.status(200).json({
            status: 'success',
            data: subsections
        })
    }).catch((err) => {
        res.status(202).json({
            status: 'failed',
            message: err.errors[0].message,
        })
    })
}

exports.delete = async (req, res) => {
    const verifyDependencies = await User.findAndCountAll({

    })
    await Subsection.destroy({
        where: { id: req.params.id }
    }).then(() => {
        res.status(200).json({
            status: 'success',
            message: 'O grupo foi eliminada com sucesso.'
        })
    }).catch((err) => {
        res.status(304).json({
            status: 'failed',
            message: err.errors[0].message,
        })
    })
}