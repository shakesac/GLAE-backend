const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const Subsection = sequelize.define('subsection', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    subsection: {
        type: Sequelize.STRING(200),
        allowNull: false,
        
    },
    code: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
    },
    fullCode: {
        type: Sequelize.VIRTUAL,
        get() {
            return this.sectionId + '' + this.code
        }
    },
}, {
    timestamps: true,
    updatedAt: false,
    validate: {
        checkId() {
            if (this.code < 0 || this.code > 9) {
                throw new Error('O código deverá ser um valor entre 0 e 9.')
            }
        }
    }
})

module.exports = Subsection