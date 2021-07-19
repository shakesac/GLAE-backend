// Verifica se o id do objecto enviado existe na base de dados
exports.checkIfExists = async (obj, id) => {
    const result = await obj.findByPk(id)
    return result ? true : false
}
exports.checkIfExistsWithOptions = async (obj, options) => {
    const result = await obj.findOne(options)
    return result ? true : false
}

exports.checkIfExistsOptWithErrorRes = async (res, obj, options, msg) => {
    const result = await obj.findOne(options).catch((err) => {
        res.status(400).json({
            status: 'failed',
            message: err.errors[0].message,
        })
    })
    if (!result) {
        res.status(400).json({
            status: 'failed',
            message: msg
        })
    }
}

// Verifica se objecto1 tem restrições na tabela do objecto 2
exports.hasConstraints = async (obj, idObj, fieldName) => {
    const result = await obj.findAndCountAll({
        where: { [fieldName]: idObj  }
    })
    return result.count > 0 ? true : false
}

exports.checkIfByPkAndGet = async (res, obj, id) => {
    const result = await obj.findByPk(id).catch((err) => {
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

exports.checkIfAndGet = async (res, obj, id, options) => {
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