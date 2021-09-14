const AppError = require('../util/appError')
const { Op } = require("sequelize");
const helper = require('../util/contr.helpers')
const User = require('../models/user.model')

exports.get = async (req, res, next) => {
    try {
        return res.status(200).json({
            status: 'success',
            data: req.user
        })
    } catch(err) {
        console.log(err)
    }
}

exports.deleteCurrentUser = (req, res) => {
    console.log(req.user)
    helper.delete(
        res,
        User,
        req.user.id,
        null,
        ''
    )
}