const builder = require('botbuilder');

const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});


// set up default dialog to use QnA Maker
const bot = new builder.UniversalBot(connector,
    [
    function (session) {
        builder.Prompts.text(session, "Hola, soy un Robot para contestar preguntas sobre nuestro producto crédito hipotecario, ¿En que te puedo ayudar? ");
    },
    require('./qnadialog.js')
    ]);


module.exports = bot;