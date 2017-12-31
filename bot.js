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
                    .text('Hola, soy un asistente digital para contestar preguntas sobre nuestro producto crédito hipotecario; cuando estes listo' +
                    ' para darnos tus datos solo escribe MasInfo.' +
                    '¿En que te puedo ayudar? '));
            }
        });
    }
});
bot.dialog('MasInfo', [
    function (session) {
        session.send("Gracias por permitirnos contactarle!.");
        builder.Prompts.text(session, "Cuál es su nombre");
        
    },
    function (session, results ) {
        session.dialogData.nombre = results.response;
        builder.Prompts.text(session, "Cuál es su correo:");
        
        
    },
    function (session, results) {
        session.dialogData.email = results.response;
        builder.Prompts.text (session, "Cuál es su teléfono de contacto?");
        
    },
    function (session, results) {
        session.dialogData.telefono = results.response;
        builder.Prompts.text (session, "Qué tema le interesa?");
        
    },
    function (session, results) {
        
        session.dialogData.tema = results.response;
        session.sendTyping();
        // Process request and display reservation details
        session.send(`Datos de Contacto Nombre:  ${session.dialogData.nombre}<br/> Email: ${session.dialogData.email} `);
        session.send(`Tema:  ${session.dialogData.tema} `);
        session.sendTyping();
        nombrecontacto = session.dialogData.nombre; emailcontacto = session.dialogData.email;
        telefonocontacto = session.dialogData.telefono; temacontacto=session.dialogData.tema;
        require('./emailcontacto.js');
        session.send(`fin de contacto`);
        session.endDialog();
    }
])
.triggerAction({
    matches: /^MasInfo$/i,
   // confirmPrompt: "This will cancel your current request. Are you sure?"
});

module.exports = bot;

