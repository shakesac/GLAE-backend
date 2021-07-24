const helper = require('../util/contr.helpers')
const ItemType = require('../models/item-cat.model')
const ItemCategory = require('../models/item-cat.model')

exports.new = async (req, res) => {
    const { id, type, itemCategoryId } = req.body
    const newType = new ItemType({
        id,
        type,
        itemCategoryId
    })
    await helper.create(res, newType)
}

exports.update = async (req, res) => {
    await helper.checkIfByPkAndUpdate(res, ItemType, req.params.id, req.body)
}

exports.get = async (req, res) => {
    const options = {include: ItemCategory, exclude: ['itemCategoryId']}
    helper.checkIfAndGet(res, ItemType, req.params.id, options)
}

exports.getAll = async (req, res) => {
    const options = {include: ItemCategory, exclude: ['itemCategoryId']}
    await helper.checkIfAndGetAll(res, ItemType, options)
}

exports.delete = async (req, res) => {
    await helper.delete(
        res,
        ItemType,
        req.params.id,
        ItemCategory,
        'itemCategoryId'
        )
}