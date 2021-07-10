const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const Subsection = sequelize.define('subsection', {
    id: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        primaryKey: true,
        validate: {
            min: 0,
            max: 9
        }
    },
    subsection: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    sectionId: {
        type: Sequelize.INTEGER(2),
        allowNull: false,
    }
})

module.exports = Subsection