const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const ItemType = sequelize.define('item_type', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
    
},
{
    timestamps: false
})

module.exports = ItemType