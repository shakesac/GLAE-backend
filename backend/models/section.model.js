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
})

module.exports = Section