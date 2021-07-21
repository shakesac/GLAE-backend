const express = require('express')
const router = express.Router()
const {verify} = require('../controllers/auth.contr')
const userContr = require('../controllers/user.contr')

router.put('/update/:id', userContr.update)
router.get('/all', userContr.getAll)
router.get('/:id', userContr.get)

module.exports = router