const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const ItemType = sequelize.define('item_type', {
    id: {
        type: Sequelize.INTEGER(2),
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    itemCategoryId: {
        type: Sequelize.INTEGER(2),
        allowNull: false,
        primaryKey: true
    }    
},
{
    timestamps: true,
    updatedAt: false,
    validate: {
        checkId() {
            if (this.id < 0 || this.id > 99) {
                throw new Error('O código deverá ser um valor entre 0 e 99.')
            }
        },
    }

})

module.exports = ItemType