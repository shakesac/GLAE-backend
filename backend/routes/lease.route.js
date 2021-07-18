const express = require('express')
const router = express.Router()

const leaseContr = require('../controllers/lease.contr')
const { verify } = require('../controllers/auth.contr')

router.post('/new', verify, leaseContr.new)
router.put('/update/:id', leaseContr.update)
router.get('/all', leaseContr.getAll)
router.post('/status/update/:id', leaseContr.updateStatus)
router.get('/user/:id', verify, leaseContr.getAllFromUser)

router.get('/:id', leaseContr.get)

module.exports = router