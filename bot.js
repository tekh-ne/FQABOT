const builder = require('botbuilder');

const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});


// set up default dialog to use QnA Maker


const bot = new builder.UniversalBot(connector,require('./qnadialog.js'));
bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                bot.send(new builder.Message()
                    .address(message.address)
                    .text("Hola, soy un asistente digital para contestar preguntas sobre nuestro producto crédito hipotecario, ¿En que te puedo ayudar? "));
            }
        });
    }
});

module.exports = bot;