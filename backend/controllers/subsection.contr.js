const Section = require('../models/section.model')
const Subsection = require('../models/subsection.model')


exports.new = async (req, res) => {
    const newSubsection = await new Subsection({
        id: req.body.id,
        subsection: req.body.subsection,
        sectionId: req.body.sectionId
    })
    await newSubsection.save().then((subsection) => {
        res.status(201).json({
            status: 'success',
            message: 'A subsecção foi criada com sucesso.',
            data: subsection
        })
    }).catch((err) => {
        console.log('Erro: ', err)
        res.status(202).json({
            status: 'fail',
            message: err.errors[0].message,
        })
    })
}

exports.update = async (req, res) => {
    await Subsection.update({
        id: req.body.id,
        subsection: req.body.subsection,
        sectionId: req.body.sectionId
    }, {
        where: { id: req.params.id }
    }).then((subsection) => {
        res.status(200).json({
            status: 'success',
            message: 'A subsecção foi actualizada com sucesso.',
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
    await Subsection.findByPk(req.params.id, {include: Section}).then((subsection) => {
        if (subsection == null) {
            res.status(404).json({
                status: 'not found',
                message: 'Não existe nenhuma subsecção com o ID especificado.'
            })
        }
        res.status(200).json({
            status: 'success',
            data: subsection,
            subsectionFullId: subsection.sectionId+''+subsection.id
        })
    }).catch((err) => {
        console.log('Erro: ', err)
        res.status(202).json({
            status: 'fail',
            message: err.errors[0].message,
        })
    })
}

exports.getAll = async (req, res) => {
    await Subsection.findAll({ include: Section }).then((subsections) => {
        res.status(200).json({
            status: 'success',
            data: subsections
        })
    }).catch((err) => {
        res.status(202).json({
            status: 'fail',
            message: err.errors[0].message,
        })
    })
}

exports.delete = async (req, res) => {
    await Subsection.destroy({
        where: { id: req.params.id }
    }).then(() => {
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