const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const ItemCategory = sequelize.define('item_category', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    code: {
        type: Sequelize.INTEGER(8),
        allowNull: false,
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
    updatedAt: false,
})

module.exports = ItemCategory