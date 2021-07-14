const Section = require('../models/section.model')
const Subsection = require('../models/subsection.model')
const User = require('../models/user.model')

exports.new = async (req, res) => {
    const newSubsection = new Subsection({
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
                message: 'Já existe uma secção com o código ' + req.body.id + 'atribuido.'
            })
        }
        res.status(400).json({
            status: 'fail',
            message: err.errors[0].message,
        })
    })
}

exports.update = async (req, res) => {
    const { id, subsection, sectionId } = req.body
    if (id < 0 && id > 9) {
        return res.status(400).json({
            status: 'failed',
            message: 'O código deverá ser um valor entre 0 e 9.'
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
            message: 'A subsecção foi actualizada com sucesso.',
        })
    }).catch((err) => {
        console.log('Erro: ', err)
        res.status(400).json({
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
    const verifyDependencies = await User.findAndCountAll({

    })
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