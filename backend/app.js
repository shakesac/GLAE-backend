const express = require('express')
const app = express()
const morgan = require('morgan')
const api = process.env.API_URL
const db = require('./util/db')
require('dotenv/config')

//MIDDLEWARE
app.use(express.json()) //body-parser on Express 4.16+ 
app.use(morgan('tiny'))



app.get('/', (req, res) =>{
    res.status(200).send('A API está a correr!')
})

app.get(api+'/teste', (req, res) =>{
    const test = {
        id: 1,
        name: 'teste'
    }
    res.status(200).send(test)
})

app.post(api+'/teste', (req, res) =>{
    const newTest = req.body
    console.log(newTest)
    res.status(201).send(newTest)
})


db.execute('SELECT * FROM cargo')
    .then(result => {
        console.log(result[0])
    }).catch(err => {
        console.log(err)
    })


module.exports = app;