const express = require('express')
const router = express.Router()

const leaseContr = require('../controllers/lease.contr')
const { verify } = require('../controllers/auth.contr')

router.post('/new', verify, leaseContr.new)
router.put('/update/:id', leaseContr.update)
router.get('/all', leaseContr.getAll)
router.delete('/:id/removeItem/:iid', leaseContr.removeItem)
router.put('/:id/status', leaseContr.updateStatus)
router.get('/:id/items', leaseContr.getItems)
router.get('/:id/status', leaseContr.getStatusHistory)

router.get('/:id', leaseContr.get)

module.exports = router