const helper = require('../util/contr.helpers')
const Section = require('../models/section.model')
const Subsection = require('../models/subsection.model')

exports.new = async (req, res) => {
    const { id, section } = req.body
    const newSection = new Section({
        id,
        section
    })
    await helper.create(res, newSection)
}

exports.update = async (req, res) => {
    await helper.checkIfByPkAndUpdate(res, Section, req.params.id, req.body)
}

exports.get = async (req, res) => {
    helper.checkIfByPkAndGet(res, Section, req.params.id)
}

exports.getAll = async (req, res) => {
    await helper.checkIfAndGetAll(res, Section)
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