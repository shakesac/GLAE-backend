const express = require('express')
const router = express.Router()
const cargoContr = require('../controllers/cargos.contr')
const {verify, isAdmin} = require('../controllers/auth.contr')

router.post('/new', verify, isAdmin, cargoContr.new)
router.put('/:id', cargoContr.update)
router.delete('/:id', cargoContr.delete)
router.get('/all', cargoContr.getAll)
router.get('/:id', cargoContr.get)

module.exports = router