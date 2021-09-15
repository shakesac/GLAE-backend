const express = require('express')
const app = express()
const morgan = require('morgan')
//const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const cors = require('cors')
const api = process.env.API_URL

const sequelize = require('./util/db')
const dbInitValues = require('./util/initValues')
require('dotenv/config')


//MIDDLEWARE
const corsOptions = {
    origin: true,
    credentials: true
}
app.use(cors(corsOptions))
//app.use(express.urlencoded({ extended: true }))
app.use(express.json()) //body-parser on Express 4.16+
app.use(helmet())
app.use(morgan('tiny')) //tiny, dev
//app.use(cookieParser())

//ROUTES
const authRoutes = require('./routes/auth.route')
const leaseRoutes = require('./routes/lease.route')
const itemRoutes = require('./routes/item.route')
const sectionRoutes = require('./routes/section.route')
const subsectionRoutes = require('./routes/subsection.route')
const userRoutes = require('./routes/user.route')
const cargoRoutes = require('./routes/cargos.routes')
app.use(api, authRoutes)
app.use(api+'/cargo', cargoRoutes)
app.use(api+'/lease', leaseRoutes)
app.use(api+'/item', itemRoutes)
app.use(api+'/section', sectionRoutes)
app.use(api+'/subsection', subsectionRoutes)
app.use(api+'/user', userRoutes)


app.get('/', (req, res, next) =>{
    res.status(200).send('A API está a correr!')
})

// MODELS
const User = require('./models/user.model')
const Cargo = require('./models/cargo.model')
const Lease = require('./models/lease.model')
const Item = require('./models/item.model')
const ItemType = require('./models/item-type.model')
const ItemCategory = require('./models/item-cat.model')
const ItemInspection = require('./models/item-inspection.model')
const Role = require('./models/user-role.model')
const LeaseStatus = require('./models/lease-status.model')
const Section = require('./models/section.model')
const Subsection = require('./models/subsection.model')

// SEQUELIZE - ASSOCIATIONS
Cargo.hasMany(User)
User.belongsTo(Cargo)

Role.hasMany(User, { foreignKey: {
    name: 'roleId',
    defaultValue: 2
}})
User.belongsTo(Role)

User.hasMany(Lease)
Lease.belongsTo(User)

ItemCategory.hasMany(ItemType, {foreignKey: 'categoryId' }, { onDelete: 'RESTRICT' })
ItemType.belongsTo(ItemCategory, {foreignKey: 'categoryId' })

ItemType.hasMany(Item, {foreignKey: 'typeId' }, { onDelete: 'RESTRICT' })
Item.belongsTo(ItemType)

Item.hasMany(ItemInspection)
ItemInspection.belongsTo(Item)

Lease.hasMany(LeaseStatus)
LeaseStatus.belongsTo(Lease)

User.hasMany(Item, { foreignKey: 'createdBy' })
Item.belongsTo(User)

Section.hasMany(Subsection, { foreignKey: 'sectionId' }, { onDelete: 'RESTRICT' })
Subsection.belongsTo(Section)

Subsection.hasMany(User, { foreignKey: 'subsectionId' }, { onDelete: 'RESTRICT' })
User.belongsTo(Subsection)

const LeaseItems = sequelize.define('lease_item', {}, { timestamps: false });
Lease.belongsToMany(Item, { through: 'lease_item' })
Item.belongsToMany(Lease, { through: 'lease_item' })



// SEQUELIZE - SYNC
const seqMode = process.env.SEQUELIZE_DEV_MODE == 'true' ? true : false
sequelize.sync({ force: seqMode }).then(result => {
    console.log('BD: ' + result.config.database + '\nUser: ' + result.config.username)
    console.log(result.config.protocol + ' ' + result.config.host + ':' + result.config.port)
    if(seqMode) dbInitValues.create()
}).catch(err => {
    console.log('ERRO: DB SYNC()', err)
})


// 404 - CATCH ALL MIDDLEWARE
app.use((req, res, next) => {
    const err = new Error
    res.status(404).json({
        status: 'failed',
        message: 'Endpoint not found.'
    })
})

//ERROR HANDLER MIDDLEWARE
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500  //Caso nao exista codigo de erro definido, usamos 500 como padrão
    err.status = err.status || 'error'
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
})

module.exports = app;