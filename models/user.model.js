const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    fullName: {
        type: Sequelize.VIRTUAL,
        get() {
            return this.firstName + ' ' + this.lastName
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
    },
    address: {
        type: Sequelize.STRING,
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = User
