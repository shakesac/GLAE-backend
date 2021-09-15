const express = require('express')
const router = express.Router()
const subsectionContr = require('../controllers/subsection.contr')
const {verify, isAdmin} = require('../controllers/auth.contr')

router.post('/new', subsectionContr.new)
router.post('/:id/adduser/:uid', subsectionContr.addUser)
router.put('/:id', subsectionContr.update)
router.delete('/:id/removeuser/:uid', subsectionContr.removeUser)
router.delete('/:id', subsectionContr.delete)
router.get('/all', subsectionContr.getAll)
router.get('/:id/parent', subsectionContr.getSection)
router.get('/:id/users', subsectionContr.getUsers)
router.get('/:id', subsectionContr.get)

module.exports = router