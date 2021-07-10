const express = require('express')
const router = express.Router()
const authContr = require('../controllers/auth.contr')

router.post('/login', authContr.login)
router.post('/register', authContr.register)

module.exports = router