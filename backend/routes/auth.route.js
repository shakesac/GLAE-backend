const express = require('express')
const router = express.Router()
const authContr = require('../controllers/auth.contr')
const {verify} = require('../controllers/auth.contr')

router.post('/login', authContr.login)
router.post('/register', authContr.register)

//ROUTES relativas ao utilizador actual
router.get('/me', verify, authContr.getCurrentUser)


module.exports = router