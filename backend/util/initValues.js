const { hashSync } = require("bcrypt");
const LeaseStatus = require("../models/lease-status.model");
const Section = require("../models/section.model");
const Subsection = require('../models/subsection.model')
const Role = require("../models/user-role.model");
const User = require("../models/user.model");
const ItemsCategory = require('../models/item-cat.model')
const ItemType = require('../models/item-type.model')

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
    ]).catch(err =>{ console.log(err.message) })
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
    ]).catch(err =>{ console.log(err.message) })
    const ItemsCategories = await ItemsCategory.bulkCreate([
        { id: 1, category: 'Sede'},
        { id: 2, category: 'Abrigo'},
        { id: 3, category: 'Cozinha'},
        { id: 4, category: 'Ferramentas'},
        { id: 5, category: 'Energizados'},
        { id: 6, category: 'Socorrismo'},
        { id: 7, category: 'Desportivos'},
        { id: 8, category: 'Diversos'},
        { id: 9, category: 'Jogos'}
    ])
    const ItemsCategories = await ItemsCategory.bulkCreate([
        { id: 01, subsection: 'Dossier', itemCategoryId: 1},
        { id: 2, subsection: 'Cinzento', itemCategoryId: 1},
        { id: 3, subsection: 'Castanho', itemCategoryId: 1},
        { id: 4, subsection: 'Preto', itemCategoryId: 1},
        { id: 5, subsection: 'Ruivo', itemCategoryId: 1},
        { id: 1, subsection: 'Pantera', itemCategoryId: 2},
        { id: 2, subsection: 'Mocho', itemCategoryId: 2},
        { id: 3, subsection: 'Falcão', itemCategoryId: 2},
        { id: 4, subsection: 'Leão', itemCategoryId: 2},
        { id: 5, subsection: 'Touro', itemCategoryId: 2},
        { id: 1, subsection: 'B.P.', itemCategoryId: 3},
        { id: 2, subsection: 'Camões', itemCategoryId: 3},
        { id: 3, subsection: 'Padeira de Aljubarrota', itemCategoryId: 3},
        { id: 1, subsection: 'Vasco da Gama', itemCategoryId: 4},
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
    ]).catch(err =>{ console.log(err.message) })
}