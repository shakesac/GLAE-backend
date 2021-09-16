const express = require('express')
const router = express.Router()
const {verify} = require('../controllers/auth.contr')
const userContr = require('../controllers/user.contr')
const User = require('../models/user.model')

router.post('/new', userContr.new)
router.post('/:id/pwd', userContr.pwd)
router.put('/:id', userContr.update)
router.put('/:id/cargo', userContr.setCargo)
router.put('/:id/permission', userContr.togglePermissions)
router.get('/all', userContr.getAll)
router.get('/:id/leases', userContr.getLeases)
router.get('/:id', userContr.get)
router.delete('/:id', userContr.delete)

module.exports = router