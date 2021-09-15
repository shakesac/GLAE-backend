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
        { code: 1, subsection: 'Branco', sectionId: 1},
        { code: 2, subsection: 'Cinzento', sectionId: 1},
        { code: 3, subsection: 'Castanho', sectionId: 1},
        { code: 4, subsection: 'Preto', sectionId: 1},
        { code: 5, subsection: 'Ruivo', sectionId: 1},
        { code: 1, subsection: 'Pantera', sectionId: 2},
        { code: 2, subsection: 'Mocho', sectionId: 2},
        { code: 3, subsection: 'Falcão', sectionId: 2},
        { code: 4, subsection: 'Leão', sectionId: 2},
        { code: 5, subsection: 'Touro', sectionId: 2},
        { code: 1, subsection: 'B.P.', sectionId: 3},
        { code: 2, subsection: 'Camões', sectionId: 3},
        { code: 3, subsection: 'Padeira de Aljubarrota', sectionId: 3},
        { code: 1, subsection: 'Vasco da Gama', sectionId: 4},
    ]).catch(err =>{ console.log(err.message) })
    const ItemsCategories = await ItemsCategory.bulkCreate([
        { code: 1, category: 'Sede'},
        { code: 2, category: 'Abrigo'},
        { code: 3, category: 'Cozinha'},
        { code: 4, category: 'Ferramentas'},
        { code: 5, category: 'Energizados'},
        { code: 6, category: 'Socorrismo'},
        { code: 7, category: 'Desportivos'},
        { code: 8, category: 'Diversos'},
        { code: 9, category: 'Jogos'}
    ]).catch(err =>{ console.log(err.message) })
    const itemsTypes = await ItemType.bulkCreate([
        { code: 0, type: 'Dossier', categoryId: 1},
        { code: 1, type: 'Mesa', categoryId: 1},
        { code: 2, type: 'Quadros', categoryId: 1},
        { code: 0, type: 'Tenda', categoryId: 2},
        { code: 1, type: 'Oleado', categoryId: 2},
        { code: 0, type: 'Cantina', categoryId: 3},
        { code: 1, type: 'Colher', categoryId: 3},
        { code: 2, type: 'Faca', categoryId: 3},
        { code: 3, type: 'Jerrican', categoryId: 3},
        { code: 4, type: 'Alguidar', categoryId: 3},
        { code: 0, type: 'Machado', categoryId: 4},
        { code: 1, type: 'Pá', categoryId: 4},
        { code: 2, type: 'Vassora', categoryId: 4},
        { code: 3, type: 'Azagaia', categoryId: 4},
        { code: 0, type: 'Bilha', categoryId: 5},
        { code: 1, type: 'Fogão', categoryId: 5},
        { code: 2, type: 'Candeeiro', categoryId: 5},
        { code: 0, type: 'Farmácia', categoryId: 6},
        { code: 1, type: 'Maca', categoryId: 6},
        { code: 0, type: 'Barco', categoryId: 7},
        { code: 1, type: 'Remos', categoryId: 7},
        { code: 2, type: 'Colete', categoryId: 7},
        { code: 3, type: 'Salva-vidas', categoryId: 7},
        { code: 4, type: 'Corda', categoryId: 7},
        { code: 5, type: 'Capacete', categoryId: 7},
        { code: 6, type: 'Tecido', categoryId: 7},
        { code: 7, type: 'Máscara', categoryId: 7},

    ]).catch(err =>{ console.log(err) })

    //DEV - DADOS DE TESTE
    const users = await User.bulkCreate([
        {
            firstName: 'Miguel',
            lastName: 'Lima',
            email: 'miguel@mail.com',
            address: 'Dummy Address',
            phoneNumber: '+351910000000', 
            password: hashSync('forte', parseInt(process.env.BCRYPT_SALT)),
            roleId: 2,
        },
        {
            firstName: 'Admin',
            lastName: 'Temp',
            email: 'admin@1.pt',
            address: 'Lisboa',
            phoneNumber: '+351930000000', 
            password: hashSync('forte', parseInt(process.env.BCRYPT_SALT)),
            roleId: 1,
        },
        {
            firstName: 'Escuteiro',
            lastName: '1',
            email: 'esc1@mail.com',
            address: 'Lisboa',
            phoneNumber: '+351960000000', 
            password: hashSync('forte', parseInt(process.env.BCRYPT_SALT)),
            roleId: 2,
        }
    ]).catch(err =>{ console.log(err.message) })
}