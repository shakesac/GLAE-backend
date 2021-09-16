const express = require('express')
const router = express.Router()

const leaseContr = require('../controllers/lease.contr')
const { verify } = require('../controllers/auth.contr')

router.post('/new', leaseContr.new)
router.put('/update/:id', leaseContr.update)
router.get('/all', leaseContr.getAll)
router.put('/:id/status', leaseContr.updateStatus)

router.get('/:id', leaseContr.get)

module.exports = router