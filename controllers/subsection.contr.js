const helper = require('../util/contr.helpers')
const Section = require('../models/section.model')
const Subsection = require('../models/subsection.model')
const User = require('../models/user.model')

exports.new = async (req, res) => {
    const { id, subsection, sectionId } = req.body
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
    const newSubsection = new Subsection({
        id,
        subsection,
        sectionId
    })
    await newSubsection.save().then((subsection) => {
        res.status(201).json({
            status: 'success',
            message: 'O grupo foi criado com sucesso',
            data: subsection
        })
    }).catch((err) => {
        if (err.errors[0].message == 'subsections.PRIMARY must be unique') {
            return res.status(400).json({
                status: 'failed',
                message: 'Já existe um grupo com o código ' + id + sectionId + ' atribuido.'
            })
        }
        res.status(400).json({
            status: 'failed',
            message: err.errors[0].message,
        })
    })
}

exports.update = async (req, res) => {
    const { id, subsection, sectionId } = req.body
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