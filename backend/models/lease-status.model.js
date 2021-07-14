const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const statusValues = [
    'pending',
    'accepted',
    'in progress',
    'returned',
    'refused',
    'canceled']

const LeaseStatus = sequelize.define('lease_status', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    status: {
        type: Sequelize.ENUM({
            values: statusValues
        }),
        defaultValue: 'pending',
        allowNull: false,
    },
    leaseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
    }, {
    updatedAt: false,
    freezeTableName: true,
})

module.exports = LeaseStatus