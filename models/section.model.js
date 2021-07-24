const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const Section = sequelize.define('section', {
    id: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        primaryKey: true,
        validate: {
            min: 0,
            max: 9
        }
    },
    section: {
        type: Sequelize.STRING(50),
        allowNull: false,
    }
}, {
    timestamps: true,
    updatedAt: false,
    validate: {
        checkId() {
            if (this.id < 0 || this.id > 9) {
                throw new Error('O código deverá ser um valor entre 0 e 9.')
            }
        }
    }
})

module.exports = Section