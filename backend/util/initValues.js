const { hashSync } = require("bcrypt");
const LeaseStatus = require("../models/lease-status.model");
const Section = require("../models/section.model");
const Subsection = require('../models/subsection.model')
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
    const subsections = await Subsection.bulkCreate([
        { id: 1, subsection: 'Branco', sectionId: 1},
        { id: 2, subsection: 'Cinzento', sectionId: 1},
        { id: 3, subsection: 'Castanho', sectionId: 1},
        { id: 4, subsection: 'Preto', sectionId: 1},
        { id: 5, subsection: 'Ruivo', sectionId: 1},
        { id: 1, subsection: 'Pantera', sectionId: 2},
        { id: 2, subsection: 'Mocho', sectionId: 2},
        { id: 3, subsection: 'Falcão', sectionId: 2},
        { id: 4, subsection: 'Leão', sectionId: 2},
        { id: 5, subsection: 'Touro', sectionId: 2},
        { id: 1, subsection: 'B.P.', sectionId: 3},
        { id: 2, subsection: 'Camões', sectionId: 3},
        { id: 3, subsection: 'Padeira de Aljubarrota', sectionId: 3},
        { id: 1, subsection: 'Vasco da Gama', sectionId: 4},
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