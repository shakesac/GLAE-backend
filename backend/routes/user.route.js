const express = require('express')
const router = express.Router()
const {verify} = require('../controllers/auth.contr')
const userContr = require('../controllers/user.contr')

router.put('/update/:id', verify, userContr.update)
router.get('/me', verify, userContr.getMe)
router.get('/all', userContr.getAll)
router.get('/:id', verify, userContr.get)

module.exports = router