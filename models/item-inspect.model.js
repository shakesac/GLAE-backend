const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const ItemInspection = sequelize.define('item_inspection', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    }
},
{
    timestamps: true,
    updatedAt: false
})

module.exports = ItemInspection