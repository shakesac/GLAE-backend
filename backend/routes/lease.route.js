const express = require('express')
const router = express.Router()

const leaseContr = require('../controllers/lease.contr')
const { verify } = require('../controllers/auth.contr')

router.post('/new', verify, leaseContr.new)
router.put('/update/:id', verify, leaseContr.update)
router.get('/all/user', verify, leaseContr.getAllFromUser)
router.get('/all', verify, leaseContr.getAll)
router.post('/status/update/:id', verify, leaseContr.updateStatus)

router.get('/:id', verify, leaseContr.get)

module.exports = router