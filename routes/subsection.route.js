const express = require('express')
const router = express.Router()
const subsectionContr = require('../controllers/subsection.contr')
const {verify, isAdmin} = require('../controllers/auth.contr')

router.post('/new', subsectionContr.new)
router.put('/:id', subsectionContr.update)
router.delete('/:id', subsectionContr.delete)
router.get('/all', subsectionContr.getAll)
router.get('/:id', subsectionContr.get)

module.exports = router