//
const Lease = require('../models/lease.model')
const User = require('../models/user.model')
// Verifica se o id do objecto enviado existe na base de dados
exports.checkIfExists = async (obj, id) => {
    const result = await obj.findByPk(id)
    return result ? true : false
}
exports.checkIfExistsWithOptions = async (obj, options) => {
    const result = await obj.findOne(options)
    return result ? true : false
}

// Verifica se objecto1 tem restrições na tabela do objecto 2
exports.hasConstraints = async (obj, idObj, fieldName) => {
    const result = await obj.findAndCountAll({
        where: { [fieldName]: idObj  }
    })
    return result.count > 0 ? true : false
}



exports.checkIfByPkAndGet = async (res, obj, id, options) => {
    const result = await obj.findByPk(id, options).catch((err) => {
        res.status(400).json({
            status: 'failed',
            message: err.errors[0].message,
        })
    })
    if (!result) {
        res.status(404).json({
            status: 'failed',
            message: 'Não existe nenhum registo com o código indicado.'
        })
    } else {
        res.status(200).json({
            status: 'success',
            data: result
        })
    }
    return res
}

exports.checkIfAndGet = async (res, obj, options) => {
    const result = await obj.findOne(options).catch((err) => {
        res.status(400).json({
            status: 'failed',
            message: err.errors[0].message,
        })
    })
    if (!result) {
        res.status(404).json({
            status: 'failed',
            message: 'Não existe nenhum registo com o código indicado.'
        })
    } else {
        res.status(200).json({
            status: 'success',
            data: result
        })
    }
    return res
}

exports.checkIfAndGetAll = async (res, obj, options) => {
    if (obj instanceof User) {
        
    }
    const result = await obj.findAll(options).catch((err) => {
        res.status(400).json({
            status: 'failed',
            message: err.errors[0].message,
        })
    })
    if (result.length < 1) {
        res.status(404).json({
            status: 'failed',
            message: 'Não existem dados.'
        })
    } else {
        res.status(200).json({
            status: 'success',
            data: result
        })
    }
    return res
}

exports.checkIfByPkAndUpdate = async (res, obj, id, body) => {
    try {
        let result = await obj.findByPk(id).catch((err) => {
            res.status(400).json({
                status: 'failed',
                message: err.errors[0].message,
            })
        })
        if (!result) {
            res.status(404).json({
                status: 'failed',
                message: 'Não existe nenhum registo com o código indicado.'
            })
        } else {
            options = { where: { id }}
            const rowsAffected = await obj.update(body, options)
            // Retornar resultado mesmo que o body.id seja null ou tenha sido alterado. (No caso em que Id não é autoincrement)
            // Ou não fazer query caso nenhuma linha tenha sido alterada.
            if (rowsAffected > 0) {
                let options = null
                if (obj == User) {
                    options = { attributes: { exclude: ['password'] }}
                }
                if (body.id && id !== body.id) {
                    result = await obj.findByPk(body.id, options)
                } else {
                    result = await obj.findByPk(id, options)
                }
                res.status(200).json({
                    status: 'success',
                    data: result
                })
            } else {
                res.status(200).json({
                    status: 'success',
                    message: 'Os valores introduzidos correspondem ao valores actualmente na base de dados.'
                })
            }
        }
        return res
    } catch (err) {
        let errorMsg
        if ('errors' in err) {
            if (err.errors[0].type && err.errors[0].type.includes('unique violation')) {
                errorMsg = 'Já existe um registo com o código indicado atribuido.'
            } else {
                errorMsg = err.errors[0].message
            }
        } else if ('original' in err) {
            if (err.original.sqlMessage && err.original.sqlMessage.includes('Foreign key constraint')) {
                errorMsg = 'Existem registos dependentes associados ao código de registo desejado. Erro: ' + err.original.sqlMessage
            } else {
                errorMsg = err.original
            }
        } else if ('name' in err) {
            if (err.name.includes('SequelizeUniqueConstraintError')) {
                if (obj == User) {
                    errorMsg = 'Já existe utilizador com o email indicado.'
                } else {
                    errorMsg = 'Já existe um registo com o código indicado atribuido.'
                }
            } else {
                errorMsg = err
            }
        } else {
            errorMsg = err
        }
        res.status(400).json({
            status: 'failed',
            message: errorMsg,
        })
    }
}

exports.create = async (res, obj, options) => {
    try {
        const newObj = await obj.save(options)
        res.status(201).json({
            status: 'success',
            message: 'O registo foi realizado com sucesso.',
            data: newObj
        })
    } catch (err) {
        let errorMsg
        if ('errors' in err) {
            if (err.errors[0].type && err.errors[0].type.includes('unique violation')) {
                errorMsg = 'Já existe um registo com o código indicado atribuido.'
            } else {
                errorMsg = err.errors[0].message
            }
        } else if ('original' in err) {
            if (err.original.sqlMessage && err.original.sqlMessage.includes('Foreign key constraint')) {
                errorMsg = 'Existem registos dependentes associados ao código de registo desejado. Erro: ' + err.original.sqlMessage
            } else {
                errorMsg = err.original
            }
        } else if ('name' in err) {
            if (err.name.includes('SequelizeUniqueConstraintError')) {
                if (obj == User) {
                    errorMsg = 'Já existe utilizador com o email indicado.'
                } else {
                    errorMsg = 'Já existe um registo com o código indicado atribuido.'
                }
            } else {
                errorMsg = err
            }
        } else {
            errorMsg = err
        }
        res.status(400).json({
            status: 'failed',
            message: errorMsg,
        })
    }
}

exports.delete = async (res, obj, id, constObj, constFieldName) => {
    const exists = await this.checkIfExists(obj, id)
    if (!exists) {
        res.status(404).json({
            status: 'failed',
            message: 'Não existe nenhum registo com o código indicado.'
        })
    } else {
        if (constObj) {
            const hasConstraints = await this.hasConstraints(constObj, id, constFieldName)
            if (hasConstraints) {
                res.status(400).json({
                    status: 'failed',
                    message: 'Existem registos associados a este objecto.'
                })
            }
        }
        await obj.destroy({
            where: { id: id }
        }).catch((err) => {
            res.status(400).json({
                status: 'failed',
                message: err.errors[0].message,
            })
        })
        res.status(200).json({
            status: 'success',
            message: 'O registo foi eliminado com sucesso.'
        })
    }
    return res
}