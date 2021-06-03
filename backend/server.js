const port = process.env.SRV_PORT || 5000
const host = '127.0.0.1'
const dotenv = require('dotenv').config()
const app = require('./app')

//INICIAR O SERVIDOR
app.listen(port, () => console.log('A correr em modo N/A. http://' + host + ':' + port))
