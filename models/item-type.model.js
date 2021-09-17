const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const ItemType = sequelize.define('item_type', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    code: {
        type: Sequelize.INTEGER(2),
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    fullCode: {
        type: Sequelize.VIRTUAL,
        get() {
            return this.categoryId + '' + this.code
        }
    },
},
{
    timestamps: true,
    updatedAt: false,
    validate: {
        checkId() {
            if (this.code < 0 || this.code > 99) {
                throw new Error('O código deverá ser um valor entre 0 e 99.')
            }
        },
    }

})

module.exports = ItemType