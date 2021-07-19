// Verifica se o id do objecto enviado existe na base de dados
exports.checkIfExists = async (id, obj) => {
    const result = await obj.findByPk(id)
    return result ? true : false
}

// Verifica se objecto1 tem restrições na tabela do objecto 2
exports.hasConstraints = async (obj, idObj, fieldName) => {
    const result = await obj.findAndCountAll({
        where: { [fieldName]: idObj  }
    })
    console.log('Resultado', result)
    return result.count > 0 ? true : false
}