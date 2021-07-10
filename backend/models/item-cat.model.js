const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const ItemCategory = sequelize.define('item_category', {
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
}, {
    timestamps: false
})

module.exports = ItemCategory