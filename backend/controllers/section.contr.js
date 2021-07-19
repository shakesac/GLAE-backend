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
    const exists = await helper.checkIfExists(Section, req.params.id)
    if (!exists) {
        return res.status(404).json({
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
    helper.checkIfByPkAndGet(res, Section, req.params.id)
}

exports.getAll = async (req, res) => {
    await helper.checkIfAndGetAll(res, Section)
    /*if (sections.length < 1) {
        return res.status(404).json({
            status: 'failed',
            message: 'Não existem secções.'
        })
    }*/
}

exports.delete = async (req, res) => {
    await helper.delete(
        res,
        Section,
        req.params.id,
        Subsection,
        'sectionId'
        )
}