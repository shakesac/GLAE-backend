const express = require('express')
const router = express.Router()
const authContr = require('../controllers/auth.contr')
const profileContr = require('../controllers/profile.contr')
const {verify} = require('../controllers/auth.contr')

router.post('/login', authContr.login)
router.post('/register', authContr.register)

//ROUTES relativas ao utilizador actual
const prefix = '/me'
router.get(prefix, verify, profileContr.get)
router.put(prefix, verify, profileContr.update)
router.delete(prefix, verify, profileContr.delete)
router.post(prefix+'/pwd', verify, profileContr.pwd)

module.exports = router