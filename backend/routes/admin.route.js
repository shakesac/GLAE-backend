// É a route que lida com a gestão dos items e utilizadores
const express = require('express')
const router = express.Router()
const {verify} = require('../controllers/auth.contr')
const api = process.env.API_URL

const rootDir = require('../util/path')

const cargosContr = require('../controllers/cargos.contr')
//router.get('/cargos', passport.authenticate('jwt', {session: false}), cargosContr.getCargos)
router.post('/cargo/new', verify, cargosContr.new)
router.put('/cargo/update/:id', cargosContr.update)
router.get('/cargo/all', cargosContr.getAll)
router.get('/cargo/:id', cargosContr.get)

module.exports = router