const express = require('express')
const router = express.Router()

const itemContr = require('../controllers/items.contr')
const itemCatContr = require('../controllers/item-cat.contr')

router.post('/new', itemContr.new)
router.put('/update/:id', itemContr.update)
router.post('/category/new', itemCatContr.new)
router.put('/category/update/:id', itemCatContr.update)

router.get('/:id', itemContr.get)

module.exports = router