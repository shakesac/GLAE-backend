const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const Cargo = sequelize.define('cargo', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    cargo: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
})

module.exports = Cargo