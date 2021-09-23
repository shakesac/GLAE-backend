const port = process.env.SRV_PORT || 5000
const sslPort = process.env.SSL_PORT || 5443
const host = '127.0.0.1'
const ssl = process.env.SSL || false
const dotenv = require('dotenv').config()
const app = require('./app')
const https = require('https');
const http = require('http');

//INICIAR O SERVIDOR
const httpServer = http.createServer(app);
httpServer.listen(port, () => {
    console.log(`Running on port ${port} without SSL encryption.`);
});
if (ssl) {
    const httpsServer = https.createServer({
        key: fs.readFileSync('/etc/letsencrypt/live/my_api_url/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/my_api_url/fullchain.pem'),
      }, app);
      httpsServer.listen(sslPort, () => {
        console.log(`Running on port ${sslPort} without SSL encryption.`);
    });
}

//app.listen(port, () => console.log('A correr em modo N/A. http://' + host + ':' + port))
