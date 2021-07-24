const express = require('express')
const router = express.Router()
const authContr = require('../controllers/auth.contr')
const {verify} = require('../controllers/auth.contr')

router.post('/login', authContr.login)
router.post('/register', authContr.register)

//ROUTES relativas ao utilizador actual
const prefix = '/me'
router.get(prefix + '/get', verify, authContr.getCurrentUser)
router.delete(prefix + '/delete', verify, authContr.deleteCurrentUser)

module.exports = router