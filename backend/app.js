const express = require('express');
const app = express()
const api = process.env.API_URL;
const bodyParser = require('body-parser')
require('dotenv/config')

//MIDDLEWARE
app.use(bodyParser.json())


app.get('/', (req, res) =>{
    res.status(200).send('A API está a correr!')
})

app.get(api+'/', (req, res) =>{
    const test = {
        id: 1,
        name: teste
    }
    res.status(200).send('A API está a correr!')
})





module.exports = app;


