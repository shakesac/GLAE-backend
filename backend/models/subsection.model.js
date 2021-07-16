const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const Subsection = sequelize.define('subsection', {
    id: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        primaryKey: true,
    },
    subsection: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    sectionId: {
        type: Sequelize.INTEGER(2),
        allowNull: false,
        primaryKey: true
    }
}, {
    validate: {
        checkId() {
            if (this.id < 0 || this.id > 9) {
                throw new Error('O código deverá ser um valor entre 0 e 9.')
            }
        }
    }
})

module.exports = Subsection