const { hashSync } = require("bcrypt")
const LeaseStatus = require("../models/lease-status.model")
const Section = require("../models/section.model")
const Subsection = require('../models/subsection.model')
const Role = require("../models/user-role.model")
const User = require("../models/user.model")
const ItemsCategory = require('../models/item-cat.model')
const ItemType = require('../models/item-type.model')
const Cargos = require('../models/cargo.model')
const Item = require("../models/item.model")
const ItemInspection = require("../models/item-inspect.model")
const Lease = require("../models/lease.model")

exports.create = async () => {
    const roles = await Role.bulkCreate([
        { role: 'admin'},
        { role: 'user'},
    ])
    const sections = await Section.bulkCreate([
        { code: 0, section: 'Agrupamento'},
        { code: 1, section: 'Alcateia'},
        { code: 2, section: 'Expedição'},
        { code: 3, section: 'Comunidade'},
        { code: 4, section: 'Clã'}
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
    const cargos = await Cargos.bulkCreate([
        {
            cargo: 'Guarda-material'
        }
    ]).catch(err =>{ console.log(err.message) })
    const items = await Item.bulkCreate([
        {
            name: 'Tenda grande',
            description: 'Tenda com capacidade para 6 pessoas.',
            purchasedAt: '2021-08-02',
            typeId: 4,
            createdBy: 2
        },
        {
            name: 'Capacete',
            description: 'Capacete de protecção.',
            purchasedAt: '2021-05-09',
            typeId: 25,
            createdBy: 2
        },
        {
            name: 'Candeeiro',
            description: 'Candeiiro de lava',
            purchasedAt: '2021-05-09',
            typeId: 17,
            createdBy: 2
        },
    ]).catch(err =>{ console.log(err.message) })
    const itemInspect = await ItemInspection.bulkCreate([
        {
            description: "Está em excelente estado.",
            itemId: '1'
        },
        {
            description: 'Apresenta alguns buracos no chão. Fecho exterior não fecha por completo.',
            itemId: '1'
        }
    ])
    const leases = await Lease.bulkCreate([
        {
            start: "2021-08-17",
            end: "2021-08-20",
            items: [1, 3],
            userId: '1'
        },
        {
            start: '2021-08-17',
            end: '2021-08-20',
            items: [2],
            userId: '3'
        },
    ])
    const leaseStatus = await LeaseStatus.bulkCreate([
        {
            status: 'pending',
            isActive: false,
            leaseId: 2
        },
        {
            status: 'accepted',
            isActive: false,
            comment: 'Cuidado com o candeeiro.',
            leaseId: 2
        },
        {
            status: 'inProgress',
            isActive: true,
            leaseId: 2
        },
        {
            status: 'pending',
            isActive: true,
            leaseId: 1
        }
    ])
}