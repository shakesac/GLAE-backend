const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const ItemInspection = sequelize.define('item_inspection', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    }
    
},
{
    timestamps: false
})

module.exports = ItemInspection