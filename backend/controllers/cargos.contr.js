const db = require('../util/db')

exports.getCargos = (req, res, next) => {
    db.execute('SELECT * FROM cargo')
    .then(result => {
        console.log(result[0])
    }).catch(err => {
        console.log(err)
    })
    res.status(200).send('Ver console.log!')
}