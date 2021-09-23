const AppError = require('../util/appError')
const { Op, QueryTypes } = require("sequelize")
const Item = require('../models/item.model')
const ItemType = require('../models/item-type.model')
const User = require('../models/user.model');
const ItemCategory = require('../models/item-cat.model')
const Lease = require('../models/lease.model')
const LeaseStatus = require('../models/lease-status.model')
const sequelize = require('../util/db');
const Subsection = require('../models/subsection.model');
const Section = require('../models/section.model');

exports.new = async (req, res, next) => {
    try {
        const {name, description, purchasedAt, typeId, uniqueItem, qty, subsectionId} = req.body
        const user = await User.findByPk(req.user.id)
        let code
        const subsection = await Subsection.findByPk(subsectionId)
        if (!subsection) return next(new AppError('O grupo indicado não existe.', 404, 'not found'))
        else {
            const countPlus1 = parseInt(await subsection.countItems()) + 1
            code = parseInt((countPlus1).toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping:false}))
        }
        const type = await ItemType.findByPk(typeId)
        if (qty && qty > 1) uniqueItem = 1 //Restrição enquanto feature não está implementada.
        if (!type) return next(new AppError('Não existe nenhum tipo de material com o ID indicado.', 404, 'not found'))
        const thisItem = await type.createItem({
            name, description, purchasedAt, uniqueItem, qty, subsectionId, code
        })
        await thisItem.setUser(user)
        return res.status(201).json({
            status: 'success',
            message: `O artigo ${thisItem.name} foi criado com sucesso.`
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.update = async (req, res, next) => {
    try {
        const { name, description, typeId, qty, subsectionId } = req.body
        const thisItem = await Item.findByPk(req.params.id)
        if (!thisItem) return next(new AppError('O artigo indicado não existe.', 404, 'not found'))
        let code
        let options
        if (!subsectionId) {
            options = { name, description, typeId, qty }
        } else {
            const subsection = await Subsection.findByPk(subsectionId)
            if (!subsection) return next(new AppError('O grupo indicado não existe.', 404, 'not found'))
            if (subsectionId != thisItem.subsectionId) {
                console.log(subsectionId, thisItem.subsectionId)
                const countPlus1 = parseInt(await subsection.countItems()) + 1
                code = parseInt((countPlus1).toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping:false}))
                options = {name, description, typeId, qty, subsectionId, code}
            } else options = { name, description, typeId, qty }
        }
        await thisItem.update(options)
        return res.status(200).json({
            status: "success",
            message: "O artigo foi alterado."
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.get = async (req, res, next) => {
    //const options = {include: ItemType}
    try {
        const options = {include: [{
            model: ItemType,
            attributes: ['type','code','fullCode', 'categoryId'],
            include: [{
                model: ItemCategory,
                attributes: ['id','code']
            }]
        },{
            model: Subsection,
            attributes: ['id','subsection','code', 'fullCode', 'sectionId'],
        }]}
        const thisItem = await Item.findByPk(req.params.id, options)
        if (!thisItem) return next(new AppError('O artigo indicado não existe.', 404, 'not found'))
        else return res.status(200).json({
            status: "success",
            data: thisItem
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const { category } = req.query
        let options
        if (category) {
            options = { where: {endOfLife: false}, include: [{
                model: ItemType,
                where: { categoryId: category },
                attributes: ['type','code','fullCode', 'categoryId'],
                include: [{
                    model: ItemCategory,
                    attributes: ['id','code']
                }]
            },{
                model: Subsection,
                attributes: ['id','subsection','code', 'fullCode', 'sectionId'],
            }]}
        } else {
            options = { where: {endOfLife: false}, include: [{
                model: ItemType,
                attributes: ['type','code','fullCode', 'categoryId'],
                include: [{
                    model: ItemCategory,
                    attributes: ['id','code']
                }]
            },{
                model: Subsection,
                attributes: ['id','subsection','code', 'fullCode', 'sectionId']
            }],
            order: [[Subsection, 'sectionId', 'ASC'], [Subsection, 'id', 'ASC'], ['code']]
        }}
        const items = await Item.findAll(options)
        if (items.length < 1) return next(new AppError('Não existem artigos.', 404, 'not found'))
        else return res.status(200).json({
            status: "success",
            data: items
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.getAvailable = async (req, res, next) => {
    try {
        const {start, end} = req.query
        if (!start || !end) return next(new AppError('É necessário indicar a data desejada.', 400, 'error'))
        const { category } = req.query
        let options
        let firstItems
        if (category) {
            firstItems = await sequelize.query('SELECT `item`.*, `type`.`type` FROM `items` as `item`, `item_types` AS `type`  WHERE `item`.`typeId` = `type`.`id` and `item`.`id` NOT IN (select `lease_items`.`itemId` from `lease_items`) AND `type`.`categoryId` = :category',
            {type: QueryTypes.SELECT,
            replacements: {category}})
            options = {
                required: true,
                include: [{
                    model: ItemType,
                    attributes: ['id','type'],
                    where: {
                        categoryId: category
                    }
                },{
                    model: Subsection,
                    attributes: ['id','subsection','code', 'fullCode']
                },{
                    model: Lease,
                    attributes: ['start', 'end'],
                    required: true,
                    where: {
                        [Op.and]: {
                            start: {
                                [Op.notBetween]: [start,end]
                            },
                            end: {
                                [Op.notBetween]: [start,end]
                            },
                    }},
                    include: [{
                        model: LeaseStatus,
                        attributes: ['status','isActive'],
                        where: {
                            isActive: true,
                            status: {
                                [Op.in]: ['pending', 'accepted','inProgress']
                            }
                        }
                    }]
                }]
            }
        } else {
            firstItems = await sequelize.query('SELECT `item`.*, `type`.`type` FROM `items` as `item`, `item_types` AS `type`  WHERE `item`.`typeId` = `type`.`id` and `item`.`id` NOT IN (select `lease_items`.`itemId` from `lease_items`)', { type: QueryTypes.SELECT })
            options = {
                required: true,
                include: [{
                    model: ItemType,
                    attributes: ['type']
                },{
                    model: Subsection,
                    attributes: ['id','subsection','code', 'fullCode']
                },{
                    model: Lease,
                    attributes: ['start', 'end'],
                    required: true,
                    where: {
                        [Op.and]: {
                            start: {
                                [Op.notBetween]: [start,end]
                            },
                            end: {
                                [Op.notBetween]: [start,end]
                            },
                    }},
                    include: [{
                        model: LeaseStatus,
                        attributes: ['status','isActive'],
                        where: {
                            isActive: true,
                            status: {
                                [Op.in]: ['pending', 'accepted','inProgress']
                            }
                        }
                    }]
                }]
            }
        }
        const otherItems = await Item.findAll(options)
        let items = firstItems.concat(otherItems)
        if (items.length < 1) return next(new AppError('Não existem artigos disponíveis.', 404, 'not found'))
        else return res.status(200).json({
            status: "success",
            data: items
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.history = async (req, res, next) => {
    try {
        const options = { where: {endOfLife: true}}
        const items = await Item.findAll(options)
        if (items.length < 1) return next(new AppError('Não existem artigos arquivados.', 404, 'not found'))
        else return res.status(200).json({
            status: "success",
            data: items
        })
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.endOfLife = async (req, res, next) => {
    try {
        const thisItem = await Item.findByPk(req.params.id)
        if (!thisItem) return next(new AppError('O artigo indicado não existe.', 404, 'not found'))
        else {
            thisItem.update({ endOfLife: true})
            return res.status(200).json({
                status: 'success',
                message: 'O artigo foi arquivado.'
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}

exports.delete = async (req, res, next) => {
    try {
        const thisItem = await Item.findByPk(req.params.id)
        if (!thisItem) return next(new AppError('O artigo indicado não existe.', 404, 'not found'))
        else if (await thisItem.countLeases()) return next(new AppError('Existem emprestimos associados a este artigo.', 400, 'failed'))
        else {
            thisItem.destroy()
            return res.status(200).json({
                status: 'success',
                message: 'O artigo foi eliminado.'
            })
        }
    } catch(err) {
        console.log(err)
        return next(new AppError(err.toString(), 500, 'error'))
    }
}