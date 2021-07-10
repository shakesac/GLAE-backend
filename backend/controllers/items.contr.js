const Item = require('../models/item.model')

exports.new = async (req, res) => {
    const newItem = await new Item({
        name: req.body.name,
        purchasedAt: req.body.purchasedAt,
        createdBy: req.body.userId
    })
    await newItem.save().catch((err) => {
        console.log('Erro: ', err)
        res.status(304).json({
            status: 'fail',
            message: err.errors[0].message,
        })
    })
    res.status(201).json({
        status: 'success',
        message: 'O item foi criado.',
        itemId: newItem.id,
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
            message: err.errors[0].message,
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
            message: err.errors[0].message,
        })
    })
}