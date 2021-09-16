const express = require('express')
const router = express.Router()
const itemContr = require('../controllers/items.contr')
const itemCatContr = require('../controllers/item-cat.contr')
const itemTypeContr = require('../controllers/item-type.contr')
const itemInspectContr = require('../controllers/item-inspect.contr')
const {verify, isAdmin} = require('../controllers/auth.contr')

router.post('/new', verify, itemContr.new)
router.put('/:id/endoflife', itemContr.endOfLife)
router.put('/:id', itemContr.update)
router.delete('/:id', itemContr.delete)
router.get('/all', itemContr.getAll)
router.get('/history', itemContr.history)
router.get('/:id', itemContr.get)

router.post('/category/new', itemCatContr.new)
router.put('/category/:id', itemCatContr.update)
router.delete('/category/:id', itemCatContr.delete)
router.get('/category/:id/types', itemCatContr.getTypes)
router.get('/category/all', itemCatContr.getAll)
router.get('/category/:id', itemCatContr.get)

router.post('/type/new', itemTypeContr.new)
router.post('/type/:id/additem/:iid', itemTypeContr.addItem)
router.put('/type/:id', itemTypeContr.update)
router.delete('/type/:id/removeitem/:iid', itemTypeContr.removeItem)
router.delete('/type/:id', itemTypeContr.delete)
router.get('/type/all', itemTypeContr.getAll)
router.get('/type/:id', itemTypeContr.get)

router.post('/:id/inspect/new', itemInspectContr.new)
router.get('/:id/inspect/all', itemInspectContr.getAll)
router.get('/inspect/:id', itemInspectContr.get)
router.put('/inspect/:id', itemInspectContr.update)

module.exports = router