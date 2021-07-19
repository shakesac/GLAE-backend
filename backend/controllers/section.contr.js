const helper = require('../util/contr.helpers')
const Section = require('../models/section.model')
const Subsection = require('../models/subsection.model')

exports.new = async (req, res) => {
    const newSection = new Section({
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
        if (err.errors[0].message == 'sections.PRIMARY must be unique') {
            return res.status(400).json({
                status: 'failed',
                message: 'Já existe uma secção com o código ' + req.body.id + ' atribuido.'
            })
        }
        res.status(400).json({
            status: 'failed',
            message: err.errors[0].message,
        })
    })
}

exports.update = async (req, res) => {
    const exists = await helper.checkIfExists(req.params.id, Section)
    if (!exists) {
        return res.status(400).json({
            status: 'failed',
            message: 'Não existe nenhuma secção com o código indicado.'
        })
    }
    const sectionUpdate = await Section.update({
        id: req.body.id,
        section: req.body.section,
    }, {
        where: { id: req.params.id }
    }).catch((err) => {
        console.log('Erro: ', err)
        res.status(202).json({
            status: 'failed',
            message: err.errors[0].message,
        })
    })
    res.status(200).json({
        status: 'success',
        message: 'A secção foi actualizada com sucesso.',
        data: sectionUpdate
    })
}

exports.get = async (req, res) => {
    const section = await Section.findByPk(req.params.id).catch((err) => {
        res.status(400).json({
            status: 'failed',
            message: err.errors[0].message,
        })
    })
    if (!section) {
        return res.status(400).json({
            status: 'failed',
            message: 'Não existe nenhuma secção com o ID especificado.'
        })
    }
    res.status(200).json({
        status: 'success',
        data: section
    })
}

exports.getAll = async (req, res) => {
    const sections = await Section.findAll().catch((err) => {
        res.status(400).json({
            status: 'failed',
            message: err.errors[0].message,
        })
    })
    if (sections.length < 1) {
        return res.status(404).json({
            status: 'failed',
            message: 'Não existem secções.'
        })
    }
    res.status(200).json({
        status: 'success',
        data: sections
    })
}

exports.delete = async (req, res) => {
    const hasConstraints = await helper.hasConstraints(Subsection, req.params.id, 'sectionId')
    if (hasConstraints) {
        return res.status(202).json({
            status: 'failed',
            message: 'Existem subsecções associadas a esta secção.'
        })
    }
    else {
        const delSection = await Section.destroy({
            where: { id: req.params.id }
        }).catch((err) => {
            res.status(304).json({
                status: 'failed',
                message: err.errors[0].message,
            })
        })
        return res.status(200).json({
            status: 'success',
            message: 'A secção foi eliminada com sucesso.'
        })
    }
}