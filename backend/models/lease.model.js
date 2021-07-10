const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const Lease = sequelize.define('lease', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    start: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    end: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})

module.exports = Lease