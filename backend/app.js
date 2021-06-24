const express = require('express')
const app = express()
const morgan = require('morgan')
const api = process.env.API_URL
const sequelize = require('./util/db')
require('dotenv/config')


//MIDDLEWARE
app.use(express.json()) //body-parser on Express 4.16+ 
app.use(morgan('tiny'))

//ROUTES
const adminRoutes = require('./routes/admin.route')
const { getCargos } = require('./controllers/cargos.contr')
app.use('/admin', adminRoutes)

app.get('/', (req, res, next) =>{
    res.status(200).send('A API está a correr!')
})

// MODELS
const User = require('./models/user.model')
const Cargo = require('./models/cargo.model')
const Lease = require('./models/lease.model')


// SEQUELIZE - ASSOCIATIONS
Cargo.hasMany(User)
User.belongsTo(Cargo)

User.hasMany(Lease)
Lease.belongsTo(User)


// SEQUELIZE - SYNC
sequelize.sync().then(result => {
    console.log('BD: ' + result.config.database + '\nUser: ' + result.config.username)
    console.log(result.config.protocol + ' ' + result.config.host + ':' + result.config.port)
}).catch(err => {
    console.log('ERRO: DB SYNC()', err)
})


// 404 - CATCH ALL MIDDLEWARE
app.use((req, res, next) => {
    res.status(404).send('<h2>404 - Não encontrado</h2>')
})

module.exports = app;