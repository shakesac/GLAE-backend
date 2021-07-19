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
    ]).catch(err =>{ console.log(err.message) })
    const itemsTypes = await ItemType.bulkCreate([
        { id: 0, type: 'Dossier', itemCategoryId: 1},
        { id: 1, type: 'Mesa', itemCategoryId: 1},
        { id: 2, type: 'Quadros', itemCategoryId: 1},
        { id: 0, type: 'Tenda', itemCategoryId: 2},
        { id: 1, type: 'Oleado', itemCategoryId: 2},
        { id: 0, type: 'Cantina', itemCategoryId: 3},
        { id: 1, type: 'Colher', itemCategoryId: 3},
        { id: 2, type: 'Faca', itemCategoryId: 3},
        { id: 3, type: 'Jerrican', itemCategoryId: 3},
        { id: 4, type: 'Alguidar', itemCategoryId: 3},
        { id: 0, type: 'Machado', itemCategoryId: 4},
        { id: 1, type: 'Pá', itemCategoryId: 4},
        { id: 2, type: 'Vassora', itemCategoryId: 4},
        { id: 3, type: 'Azagaia', itemCategoryId: 4},
        { id: 0, type: 'Bilha', itemCategoryId: 5},
        { id: 1, type: 'Fogão', itemCategoryId: 5},
        { id: 2, type: 'Candeeiro', itemCategoryId: 5},
        { id: 0, type: 'Farmácia', itemCategoryId: 6},
        { id: 1, type: 'Maca', itemCategoryId: 6},
        { id: 0, type: 'Barco', itemCategoryId: 7},
        { id: 1, type: 'Remos', itemCategoryId: 7},
        { id: 2, type: 'Colete', itemCategoryId: 7},
        { id: 3, type: 'Salva-vidas', itemCategoryId: 7},
        { id: 4, type: 'Corda', itemCategoryId: 7},
        { id: 5, type: 'Capacete', itemCategoryId: 7},
        { id: 6, type: 'Tecido', itemCategoryId: 7},
        { id: 7, type: 'Capacete', itemCategoryId: 7},

    ]).catch(err =>{ console.log(err) })

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