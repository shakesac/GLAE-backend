const express = require('express')
const router = express.Router()

const leaseContr = require('../controllers/lease.contr')

router.post('/new', leaseContr.new)
router.put('/update/:id', leaseContr.update)
router.get('/all', leaseContr.getAll)
router.get('/:id', leaseContr.get)

module.exports = router