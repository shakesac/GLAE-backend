const dotenv = require('dotenv').config()
const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB_DATA, process.env.DB_USER, process.env.DB_PASS, {
    dialect: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    pool: {
        max: 10,
        min: 0,
        idle: 30000, //(em ms. Tempo maximo que a poolm pode estar idle aaté ser libertada)
        acquire: 10000,
    }
})

module.exports = sequelize;