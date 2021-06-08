const express = require('express')
const app = express()
const morgan = require('morgan')
const api = process.env.API_URL
require('dotenv/config')


//MIDDLEWARE
app.use(express.json()) //body-parser on Express 4.16+ 
app.use(morgan('tiny'))

//ROUTES
const adminRoutes = require('./routes/admin.route')
app.use('/admin', adminRoutes)

app.get('/', (req, res, next) =>{
    res.status(200).send('A API está a correr!')
})


// 404 - CATCH ALL MIDDLEWARE
app.use((req, res, next) => {
    res.status(404).send('<h2>404 - Não encontrado</h2>')

})

module.exports = app;