const express = require('express');
const app = express()
const api = process.env.API_URL;

app.get('/', (req, res) =>{
    res.status(200).send('A API está a correr!')
})



module.exports = app;


