const Item = require('../models/item.model')

exports.new = async (req, res) => {
    const newItem = new Item({
        id: req.body.id,
        name: req.body.name,
        purchasedAt: req.body.purchasedAt,
        createdBy: req.body.user.Id
    })
}

exports.update = async (req, res) => {
    await Item.update({
        name: req.body.name,
        purchasedAt:
    }, {
        where: { id: req.params.id}
    }).catch((err) => {
        console.log('Erro: ', err)
        res.status(304).json({
            status: 'fail',
            message: 'Ocorreu um erro ao actualizar o emprestimo'
        })
    })
    res.status(201).json({
        status: 'success',
        message: 'O emprestimo foi actualizado com sucesso'
    })
}
}