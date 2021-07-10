const Item = require('../models/item.model')

exports.new = async (req, res) => {
    const newItem = new Item({
        id: req.body.id,
        name: req.body.name,
        purchasedAt: req.body.purchasedAt,
        createdBy: req.body.user.Id
    })
    await item.save().catch((err) => {
        console.log('Erro: ', err)
        res.status(304).json({
            status: 'fail',
            message: 'Ocorreu um erro ao criar item',
        })
    })
    res.status(201).json({
        status: 'success',
        message: 'O item foi criado.',
        itemId: item.id,
    })
}

exports.update = async (req, res) => {
    const upItem = await Item.update({
        name: req.body.name,
        purchasedAt: req.body.purchasedAt
    }, {
        where: { id: req.params.id}
    }).catch((err) => {
        console.log('Erro: ', err)
        res.status(304).json({
            status: 'fail',
            message: 'Ocorreu um erro ao actualizar o item'
        })
    })
    res.status(201).json({
        status: 'success',
        message: 'O item foi actualizado com sucesso',
        data: upItem
    })
}

exports.get = async (req, res) => {
    await Item.findByPk(req.params.id).then((item) => {
        res.status(200).json({
            status: 'success',
            data: item
        })
    }).catch((err) => {
        console.log('Erro: ', err)
        res.status(202).json({
            status: 'fail',
            message: 'Ocorreu um erro ao obter o emprestimo'
        })
    })
}