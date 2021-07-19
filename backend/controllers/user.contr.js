const helper = require('../util/contr.helpers')
const User = require('../models/user.model')
const Subsection = require('../models/subsection.model')

exports.update = async (req, res) => {
    const exists = await helper.checkIfExists(User, req.params.id)
    if (!exists) {
        return res.status(404).json({
            status: 'failed',
            message: 'Não existe nenhum utilizador com o código indicado.'
        })
    }
    await User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        roleId: req.body.roleId,
        subsectionId: req.body.subsectionId
    }, {
        where: { id: req.params.id }
    }).then((user) => {
        res.status(200).json({
            status: 'success',
            message: 'O utilizador foi actualizado com sucesso.',
            data: user
        })
    }).catch((err) => {
        console.log('Erro: ', err)
        res.status(304).json({
            status: 'failed',
            message: err.errors[0].message,
        })
    })
}

exports.get = (req, res) => {
    helper.checkIfByPkAndGet(res, User, req.params.id)
}

exports.getAll = async (req, res) => {
    const options = { include: Subsection }
    helper.checkIfAndGetAll(res, User, options)
}

exports.getMe = async (req, res) => {
    console.log(req.user)
    await User.findByPk(req.user.id).then((user) => {
        return res.status(200).json({
            status: 'success',
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                subsectionId: user.subsectionId
            },
        })
    }).catch((err) => {
        console.log('Erro: ', err)
        res.status(202).json({
            status: 'failed',
            message: err.errors[0].message,
        })
    })
}