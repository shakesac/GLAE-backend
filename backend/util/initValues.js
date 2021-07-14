const { hashSync } = require("bcrypt");
const LeaseStatus = require("../models/lease-status.model");
const Section = require("../models/section.model");
const Role = require("../models/user-role.model");
const User = require("../models/user.model");

exports.create = async () => {
    const roles = await Role.bulkCreate([
        { role: 'admin'},
        { role: 'user'},
    ])
    const sections = await Section.bulkCreate([
        { id: 0, section: 'Agrupamento'},
        { id: 1, section: 'Alcateia'},
        { id: 2, section: 'Expedição'},
        { id: 3, section: 'Comunidade'},
        { id: 4, section: 'Clã'}
    ])


    //DEV - DADOS DE TESTE
    const users = await User.bulkCreate([
        {
            firstName: 'Miguel',
            lastName: 'Lima',
            email: 'miguel@mail.com',
            address: 'Dummy Address',
            phoneNumber: '+351910000000', 
            password: hashSync('forte', parseInt(process.env.BCRYPT_SALT))
        }
    ])
}