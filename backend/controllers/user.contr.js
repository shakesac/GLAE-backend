const User = require('../models/user.model')

exports.update = async (req, res) => {
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
    }).then((subsection) => {
        res.status(200).json({
            status: 'success',
            message: 'O utilizador foi actualizado com sucesso.',
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
    await User.findByPk(req.params.id).then((user) => {
        if (user == null) {
            return res.status(404).json({
                status: 'not found',
                message: 'Não existe nenhuma subsecção com o ID especificado.'
            })
        }
        res.status(200).json({
            status: 'success',
            data: user,
        })
    }).catch((err) => {
        console.log('Erro: ', err)
        res.status(202).json({
            status: 'fail',
            message: err.errors[0].message,
        })
    })
}

exports.getMe = async (req, res) => {
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
            status: 'fail',
            message: err.errors[0].message,
        })
    })
}