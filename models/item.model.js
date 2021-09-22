const Sequelize = require('sequelize')
const sequelize = require('../util/db')
const User = require('./user.model')

const Item = sequelize.define('item', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    description: {
        type:Sequelize.TEXT
    },
    purchasedAt: {
        type: Sequelize.DATEONLY,
    },
    endOfLife: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    qty: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    uniqueItem: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    }
},
{
    timestamps: true,
    updatedAt: false,
    validate: {
        checkComment() {
            if (this.description && this.description.length > 1000) {
                throw new Error('A descrição não pode ter mais de 1000 caracteres.')
            }
        }
    }
})

module.exports = Item