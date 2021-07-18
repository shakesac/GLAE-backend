const express = require('express')
const router = express.Router()
const sectionContr = require('../controllers/section.contr')
const subsectionContr = require('../controllers/subsection.contr')
const subSecPre = '/sub'
const {verify} = require('../controllers/auth.contr')

router.post('/new', sectionContr.new)
router.put('/update/:id', sectionContr.update)
router.delete('/delete/:id', sectionContr.delete)
router.get('/all', sectionContr.getAll)
router.get('/:id/sub', subsectionContr.getAllFromSection)
router.get('/:id', sectionContr.get)
router.post(subSecPre+'/new', subsectionContr.new)
router.put(subSecPre+'/update/:id', subsectionContr.update)
router.delete(subSecPre+'/delete/:id', subsectionContr.delete)
router.get(subSecPre+'/all', verify, subsectionContr.getAll)
router.get(subSecPre+'/:id', subsectionContr.get)

module.exports = router