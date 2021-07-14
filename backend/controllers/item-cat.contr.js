const Category = require('../models/item-cat.model')

exports.new = async (req, res) => {
    const { id, category } = req.body
    const newCategory = new Category({
        id,
        category
    })
    await newCategory.save().then((category) => {
        res.status(201).json({
            status: 'success',
            message: 'A categoria de material foi criada com sucesso',
            data: category
        })
    }).catch((err) => {
        if (err.errors[0].message == 'item_categories.PRIMARY must be unique') {
            return res.status(400).json({
                status: 'failed',
                message: 'Já existe uma categoria de material com o código ' + req.body.id + ' atribuido.'
            })
        }
        res.status(400).json({
            status: 'fail',
            message: err.errors[0].message,
        })
    })
}

exports.update = async (req, res) => {
    const { id, category } = req.body
    const checkCategory = await Category.findByPk(req.params.id).catch((err) => {
        res.status(400).json({
            status: 'failed',
            message: err.errors[0].message,
        })
    })
    if (!checkCategory) {
        return res.status(400).json({
            status: 'failed',
            message: 'Não existe nenhuma categoria de material com o código indicado.'
        })
    }
    await Category.update({
        id,
        category
    }, {
        where: { id: req.params.id }
    }).then(() => {
        res.status(200).json({
            status: 'success',
            message: 'A categoria de material foi actualizada com sucesso.',
        })
    }).catch((err) => {
        if (err.errors[0].message == 'item_categories.PRIMARY must be unique') {
            return res.status(400).json({
                status: 'failed',
                message: 'Já existe uma categoria de material com o código ' + req.body.id + 'atribuido.'
            })
        }
        res.status(400).json({
            status: 'fail',
            message: err.errors[0].message,
        })
    })
}