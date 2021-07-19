const ItemType = require('../models/item-cat.model')

const checkIfExists = async (id) => {
    const itemType = await ItemType.findByPk(id).catch((err) => {
        res.status(400).json({
            status: 'failed',
            message: err.errors[0].message,
        })
    })
    const result = itemType ? true : false
    return result
}

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
    if (!checkIfExists(req.params.id)) {
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
    await Subsection.findByPk(req.params.id, {include: Section}).then((subsection) => {
        if (subsection == null) {
            res.status(404).json({
                status: 'not found',
                message: 'Não existe nenhuma subsecção com o ID especificado.'
            })
        }
        res.status(200).json({
            status: 'success',
            data: subsection,
            subsectionFullId: subsection.sectionId+''+subsection.id
        })
    }).catch((err) => {
        console.log('Erro: ', err)
        res.status(202).json({
            status: 'fail',
            message: err.errors[0].message,
        })
    })
}