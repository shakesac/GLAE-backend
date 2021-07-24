const helper = require('../util/contr.helpers')
const Item = require('../models/item.model')
const ItemType = require('../models/item-type.model')

exports.new = async (req, res) => {
    const {name, description, purchasedAt, createdBy} = req.body
    const newItem = await new Item({
        name,
        description,
        purchasedAt,
        createdBy
    })
    await helper.create(res, newItem)
}

exports.update = async (req, res) => {
    await helper.checkIfByPkAndUpdate(res, Item, req.params.id, req.body)
}

exports.get = async (req, res) => {
    const options = {include: ItemType}
    helper.checkIfAndGet(res, Item, req.params.id, options)
}

exports.getAll = async (req, res) => {
    const options = {include: ItemType}
    await helper.checkIfAndGetAll(res, Item, options)
}

exports.delete = async (req, res) => {
    await helper.delete(
        res,
        Item,
        req.params.id,
        null,
        ''
        )
}