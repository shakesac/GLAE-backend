const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const ItemCategory = sequelize.define('lease_status', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    status: {
        type: Sequelize.STRING,
        values: ['pending', 'accepted', 'in progress', 'finished', 'refused'],
        allowNull: false,
    },
    leaseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
    }, {
    updatedAt: false,
})

module.exports = ItemCategory