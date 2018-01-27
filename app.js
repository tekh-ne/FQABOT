const restify = require('restify');
require('dotenv').config();
//agregamos esta lineas 27/08/2018
require('dotenv-extended').load()

const bot = require('./bot.js');

const server = restify.createServer();
server.post('/api/messages', bot.connector('*').listen());
server.listen(process.env.PORT, () => {
    console.log(`${server.name} listening to ${server.url}`);
});

