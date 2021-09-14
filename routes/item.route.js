const express = require('express')
const router = express.Router()

const itemContr = require('../controllers/items.contr')
const itemCatContr = require('../controllers/item-cat.contr')
const itemTypeContr = require('../controllers/item-type.contr')

router.post('/new', itemContr.new)
router.put('/:id', itemContr.update)
router.delete('/:id', itemContr.delete)
router.get('/all', itemContr.getAll)
router.get('/:id', itemContr.get)

router.post('/category/new', itemCatContr.new)
router.put('/category/:id', itemCatContr.update)
router.delete('/category/:id', itemCatContr.delete)
router.get('/category/all', itemCatContr.getAll)
router.get('/category/:id', itemCatContr.get)

router.post('/type/new', itemTypeContr.new)
router.put('/type/:id', itemTypeContr.update)
router.delete('/type/:id', itemTypeContr.delete)
router.get('/type/all', itemTypeContr.getAll)
router.get('/type/:id', itemTypeContr.get)

module.exports = router