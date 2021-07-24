const bcrypt = require('bcrypt')
const bcryptSalt = parseInt(process.env.BCRYPT_SALT)
const helper = require('../util/contr.helpers')
const User = require('../models/user.model')
const Item = require('../models/item.model')
const Subsection = require('../models/subsection.model')
const { options } = require('../routes/auth.route')

exports.update = async (req, res) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, bcryptSalt)
    }
    await helper.checkIfByPkAndUpdate(res, User, req.params.id, req.body)
}

exports.get = (req, res) => {
    let options = { include: Subsection, attributes: { exclude: ['password'] }}
    helper.checkIfByPkAndGet(res, User, req.params.id, options)
}

exports.getAll = (req, res) => {
    let options = { include: Subsection, attributes: { exclude: ['password'] }}
    helper.checkIfAndGetAll(res, User, options)
}

exports.delete = (req, res) => {
    helper.delete(
        res,
        User,
        req.params.id,
        Item,
        'createdBy'
    )
}