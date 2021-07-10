const Section = require('../models/section.model')
const Subsection = require('../models/subsection.model')
const User = require('../models/user.model')

exports.new = async (req, res) => {
    const newSection = await new Section({
        id: req.body.id,
        section: req.body.section
    })
    await newSection.save().then((section) => {
        res.status(201).json({
            status: 'success',
            message: 'A secção foi criada com sucesso',
            data: section
        })
    }).catch((err) => {
        console.log('Erro: ', err)
        res.status(304).json({
            status: 'fail',
            message: err.errors[0].message,
        })
    })
}

exports.update = async (req, res) => {
    await Section.update({
        id: req.body.id,
        section: req.body.section,
    }, {
        where: { id: req.params.id }
    }).then((subsection) => {
        res.status(200).json({
            status: 'success',
            message: 'A secção foi actualizada com sucesso.',
        })
    }).catch((err) => {
        console.log('Erro: ', err)
        res.status(304).json({
            status: 'fail',
            message: err.errors[0].message,
        })
    })
}

exports.get = async (req, res) => {
    await Section.findByPk(req.params.id).then((section) => {
        res.status(200).json({
            status: 'success',
            data: section
        })
    }).catch((err) => {
        console.log('Erro: ', err)
        res.status(404).json({
            status: 'fail',
            message: err.errors[0].message,
        })
    })
}

exports.getAll = async (req, res) => {
    await Section.findAll().then((sections) => {
        res.status(200).json({
            status: 'success',
            data: sections
        })
    }).catch((err) => {
        res.status(202).json({
            status: 'fail',
            message: err.errors[0].message,
        })
    })
}

exports.delete = async (req, res) => {
    await Section.destroy({
        where: { id: req.params.id }
    }).then((section) => {
        res.status(200).json({
            status: 'success',
            message: 'A secção foi eliminada com sucesso.'
        })
    }).catch((err) => {
        res.status(304).json({
            status: 'failed',
            message: err.errors[0].message,
        })
    })
}