const helper = require('../util/contr.helpers')
const ItemType = require('../models/item-cat.model')

exports.new = async (req, res) => {
    const { id, type, itemCategoryId } = req.body
    const newType = new ItemType({
        id,
        type,
        itemCategoryId
    })
    await newItemType.save().then((itemType) => {
        res.status(201).json({
            status: 'success',
            message: 'A categoria de material foi criada com sucesso',
            data: itemType
        })
    }).catch((err) => {
        if (err.errors[0].message == 'item_types.PRIMARY must be unique') {
            return res.status(400).json({
                status: 'failed',
                message: 'Já existe um tipo de material com o código ' + req.body.id + ' atribuido.'
            })
        }
        res.status(400).json({
            status: 'failed',
            message: err.errors[0].message,
        })
    })
}

exports.update = async (req, res) => {
    const { id, type, itemCategoryId } = req.body
    if (!helper.checkIfExists(id, ItemType)) {
        return res.status(400).json({
            status: 'failed',
            message: 'Não existe nenhuma categoria de material com o código indicado.'
        })
    }
    await Category.update(
        { id, type, itemCategoryId },
        { where: { id: req.params.id }
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
            status: 'failed',
            message: err.errors[0].message,
        })
    })
}

exports.get = async (req, res) => {
    helper.checkIfAndGet(res, ItemType, req.params.id)
}