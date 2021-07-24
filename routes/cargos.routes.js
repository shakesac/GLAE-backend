const express = require('express')
const router = express.Router()
const cargoContr = require('../controllers/cargos.contr')
const {verify} = require('../controllers/auth.contr')

router.post('/new', cargoContr.new)
router.put('/update/:id', cargoContr.update)
router.delete('/delete/:id', cargoContr.delete)
router.get('/all', cargoContr.getAll)
router.get('/:id', cargoContr.get)

module.exports = router