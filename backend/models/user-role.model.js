const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const Role = sequelize.define('role', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    role: {
        type: Sequelize.STRING,
        values: ['admin', 'user']
    }
}, {
    timestamps: false
}
)

module.exports = Role