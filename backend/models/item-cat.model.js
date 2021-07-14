const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const ItemCategory = sequelize.define('item_category', {
    id: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        primaryKey: true,
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    timestamps: false,
    validate: {
        checkId() {
            if (this.id < 0 || this.id > 9) {
                throw new Error('O código deverá ser um valor entre 0 e 9.')
            }
        }
    }
})

module.exports = ItemCategory