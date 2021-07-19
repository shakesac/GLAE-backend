export async function checkIfExists(id, obj) {
    const result = await obj.findByPk(id)
    return result ? true : false
}