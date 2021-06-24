const Cargo = require('../models/cargo.model')
const db = require('../util/db')

exports.getCargos = (req, res, next) => {
    const cargos = Cargo.getAll()
    res.status(200).send(cargos)
}
exports.addCargo = (req, res, next) => {
    const cargo = new Cargo(req.body.title)
    cargo.save();
    res.status(201).send(cargo)
}


// TESTE
/* 
    db.execute('SELECT * FROM cargo')
    .then(result => {
        console.log(result[0])
    }).catch(err => {
        console.log(err)
    })
*/