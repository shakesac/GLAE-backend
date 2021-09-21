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
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
})

module.exports = Cargo