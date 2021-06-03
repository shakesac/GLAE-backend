const port = process.env.SRV_PORT || 5000
const host = '127.0.0.1'
const dotenv = require('dotenv').config()
const app = require('./app')
const mysql  = require('mysql');

//CRIAR LIGAÇÃO À BASE DE DADOS
const dbconnection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATA
})
dbconnection.connect(function(err) {
    if (err) {
        return console.error('ERRO DB: ' + err.message)
    }
    console.log('Ligação à base de dados realizada com sucesso.')
})

//INICIAR O SERVIDOR
app.listen(port, () => console.log('A correr em modo N/A. http://' + host + ':' + port))