const Sequelize = require('sequelize')
const sequelize = require('../util/db')
const statusValues = process.env.LEASE_STATUS.split(',')

const LeaseStatus = sequelize.define('lease_status', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    status: {
        type: Sequelize.ENUM({
            values: statusValues
        }),
        defaultValue: 'pending',
        allowNull: false,
    },
    leaseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    comment: {
        type: Sequelize.TEXT
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
    }, {
    updatedAt: false,
    freezeTableName: true,
    // Verificar se o estado introduzido é válido (pertence ao Array LEASE_STATUS)
    validate: {
        checkStatus() {
            if (!statusValues.includes(this.status)) {
                throw new Error('O estado indicado não é válido. Estados: ' + statusValues)
            }
        },
        checkComment() {
            if (this.comment && this.comment.length > 1000) {
                throw new Error('O comentário não pode ter mais de 1000 caracteres.')
            }
        }
    }
})

module.exports = LeaseStatus
