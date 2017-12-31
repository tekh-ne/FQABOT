const restify = require('restify');
require('dotenv').config();
const bot = require('./bot.js');
var emailcontacto = "";
var nombrecontacto = "";
var telefonocontacto ="";
var temacontacto="";

const server = restify.createServer();
server.post('/api/messages', bot.connector('*').listen());
server.listen(process.env.PORT, () => {
    console.log(`${server.name} listening to ${server.url}`);
});