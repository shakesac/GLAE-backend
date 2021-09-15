const express = require('express')
const router = express.Router()
const sectionContr = require('../controllers/section.contr')
const subsectionContr = require('../controllers/subsection.contr')
const subSecPre = '/sub'
const {verify, isAdmin} = require('../controllers/auth.contr')

router.post('/new', sectionContr.new)
router.put('/:id', sectionContr.update)
router.delete('/:id', sectionContr.delete)
router.get('/all', sectionContr.getAll)
router.get('/:id/subs', sectionContr.getSubs)
router.get('/:id', sectionContr.get)

module.exports = router