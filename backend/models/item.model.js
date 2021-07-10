const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const Item = sequelize.define('item', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    purchasedAt: {
        type: Sequelize.DATEONLY,
    },
    createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
},
{
    timestamps: true,
    updatedAt: false,
})

module.exports = Item