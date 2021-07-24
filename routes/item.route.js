const express = require('express')
const router = express.Router()

const itemContr = require('../controllers/items.contr')
const itemCatContr = require('../controllers/item-cat.contr')
const itemTypeContr = require('../controllers/item-type.contr')

router.post('/new', itemContr.new)
router.put('/update/:id', itemContr.update)
router.delete('/delete/:id', itemContr.delete)
router.get('/all', itemContr.getAll)
router.get('/:id', itemContr.get)

router.post('/category/new', itemCatContr.new)
router.put('/category/update/:id', itemCatContr.update)
router.delete('/category/delete/:id', itemCatContr.delete)
router.get('/category/all', itemCatContr.getAll)
router.get('/category/:id', itemCatContr.get)

router.post('/type/new', itemTypeContr.new)
router.put('/type/update/:id', itemTypeContr.update)
router.delete('/type/delete/:id', itemTypeContr.delete)
router.get('/type/all', itemTypeContr.getAll)
router.get('/type/:id', itemTypeContr.get)

module.exports = router