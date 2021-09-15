const express = require('express')
const router = express.Router()
const {verify} = require('../controllers/auth.contr')
const userContr = require('../controllers/user.contr')
const User = require('../models/user.model')

router.post('/new', userContr.new)
router.post('/:id/pwd', userContr.pwd)
router.put('/:id/pwd', userContr.pwd)
router.get('/all', userContr.getAll)
router.get('/:id', userContr.get)
router.delete('/:id', userContr.delete)

module.exports = router