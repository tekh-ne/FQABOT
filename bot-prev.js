const builder = require('botbuilder');

const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});


// set up default dialog to use QnA Maker
bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                bot.send(new builder.Message()
                    .address(message.address)
                    .text("Hola, soy un Robot para contestar preguntas sobre nuestro producto crédito hipotecario, ¿En que te puedo ayudar? "."));
            }
        });
    }
});
const bot = new builder.UniversalBot(connector,
    [
    function (session) {
        builder.Prompts.text(session, "Hola, soy un Robot para contestar preguntas sobre nuestro producto crédito hipotecario, ¿En que te puedo ayudar? ");
    },
    require('./qnadialog.js')
    ]);


module.exports = bot;