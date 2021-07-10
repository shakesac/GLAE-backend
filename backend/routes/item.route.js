const express = require('express')
const router = express.Router()

const itemContr = require('../controllers/items.contr')

router.post('/new', itemContr.new)
router.put('/update/:id', itemContr.update)
router.get('/:id', itemContr.get)

module.exports = router