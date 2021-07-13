const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const statusValues = process.env.LEASE_STATES

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
        allowNull: false,
    },
    leaseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
    }, {
    updatedAt: false,
})

module.exports = LeaseStatus