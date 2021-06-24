// É a route que lida com a gestão dos items e utilizadores
const express = require('express')
const router = express.Router()
const api = process.env.API_URL

const rootDir = require('../util/path')

const cargosContr = require('../controllers/cargos.contr')
router.get('/cargos', cargosContr.getCargos)
router.post('/cargos/add', cargosContr.addCargo)


router.get(api+'/teste', (req, res) =>{
    const test = {
        id: 1,
        name: 'teste'
    }
    res.status(200).send(test)
})

router.post(api+'/teste', (req, res) =>{
    const newTest = req.body
    console.log(newTest)
    res.status(201).send(newTest)
})

module.exports = router