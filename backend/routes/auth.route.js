const express = require('express')
const router = express.Router()
const authContr = require('../controllers/auth.contr')
const {verify} = require('../controllers/auth.contr')

router.post('/login', authContr.login)
router.post('/register', authContr.register)
router.get('/logout', verify, authContr.logout)
//router.post('/verify', authContr.verify)

module.exports = router