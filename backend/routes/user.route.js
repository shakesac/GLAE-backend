const express = require('express')
const router = express.Router()
const userContr = require('../controllers/user.contr')

router.put('/update/:id', userContr.update)
router.get('/:id', userContr.get)

module.exports = router