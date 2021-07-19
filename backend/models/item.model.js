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
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    description: {
        type:Sequelize.TEXT
    },
    purchasedAt: {
        type: Sequelize.DATEONLY,
    },
    createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    
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