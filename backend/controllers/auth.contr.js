
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const bcryptSalt = parseInt(process.env.BCRYPT_SALT)
const jwtConfig = require('../util/jwt')



exports.register = async (req, res) => {
    const verifyEmail = await User.findOne({
        where: {
            email: req.body.email
        }
    }).catch((err) => {
        console.log('Error: ', err)
    })
    if(verifyEmail) {
        return res.status(200).json({
            message: 'Já existe um utilizador com o email indicado.'
        })
    }
    try {
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            password: bcrypt.hashSync(req.body.password, bcryptSalt)
        })
        await newUser.save().catch((err) => {
            console.log('Error: ', err)
            res.status(204).json({
                status: 'failed',
                message: err.errors[0].message,
            })
        })
        res.status(201).json({
            status: 'success',
            message: 'Utilizador registado com sucesso.',
            UserId: newUser.id
        })
    } catch (err) {
        console.log('Erro: ', err)
        res.status(400).json({
            status: 'fail',
            message: 'Sintaxe Inválida'
        })
    }
    /*
    */
}

exports.login = async (req, res) => {
    const loginData = {
        email: req.body.email,
        password: req.body.password
    }
    const checkUser = await User.findOne({
        where: {email: loginData.email}
    }).catch((err) => {
        console.log('Erro: ', err)
    })
    if (!checkUser) return res.status(202).json({
        status: 'fail',
        message: 'Utilizador ou senha inválidos!'  //Não divulgamos apenas que o email não existe por razões de segurança
    })
    if (!bcrypt.compareSync(loginData.password, checkUser.password)) return res.status(202).json({
            status: 'fail',
            message: 'Utilizador ou senha inválidos!'  //Não divulgamos apenas que a senha está errada por razões de segurança
    })
    const token = jwt.sign({
        id: checkUser.id,
        email: checkUser.email
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
        algorithm: process.env.JWT_ALGORITHM
    })

    res.status(200).json({
        status: 'success',
        message: 'Sessão iniciada',
        token: token
    })
}