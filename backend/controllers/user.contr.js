const bcrypt = require('bcrypt')
const bcryptSalt = parseInt(process.env.BCRYPT_SALT)
const helper = require('../util/contr.helpers')
const User = require('../models/user.model')
const Subsection = require('../models/subsection.model')

exports.update = async (req, res) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, bcryptSalt)
    }
    await helper.checkIfByPkAndUpdate(res, User, req.params.id, req.body)
}

exports.get = (req, res) => {
    let options = { attributes: { exclude: ['password'] }}
    helper.checkIfByPkAndGet(res, User, req.params.id, options)
}

exports.getAll = async (req, res) => {
    let options = { attributes: { exclude: ['password'] }}
    helper.checkIfAndGetAll(res, User, options)
}

exports.getMe = async (req, res) => {
    const options = { attributes: { exclude: ['password'] }}
    await helper.checkIfByPkAndGet(res, User, req.user.id, options)
}