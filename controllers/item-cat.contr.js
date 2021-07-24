const helper = require('../util/contr.helpers')
const Category = require('../models/item-cat.model')
const ItemType = require('../models/item-type.model')

exports.new = async (req, res) => {
    const { id, category } = req.body
    const newCategory = new Category({
        id,
        category
    })
    await helper.create(res, newCategory)
}

exports.update = async (req, res) => {
    await helper.checkIfByPkAndUpdate(res, Category, req.params.id, req.body)
}

exports.get = async (req, res) => {
    helper.checkIfByPkAndGet(res, Category, req.params.id)
}

exports.getAll = async (req, res) => {
    await helper.checkIfAndGetAll(res, Category)
}

exports.delete = async (req, res) => {
    await helper.delete(
        res,
        Category,
        req.params.id,
        ItemType,
        'itemCategoryId'
        )
}