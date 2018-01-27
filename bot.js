

const builder = require('botbuilder');
const mensaje = require('./emailcontacto');

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
        builder.Prompts.text(session, "Cuál es su nombre2");        
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
                // 
        session.send(`Datos de Contacto Nombre:  ${session.dialogData.nombre}<br/> Email: ${session.dialogData.email} `);
        session.send(`Tema:  ${session.dialogData.tema} `);
        mensaje.correoenviado(session.dialogData.nombre, session.dialogData.email,session.dialogData.telefono,session.dialogData.tema);
        session.send(`fin de contacto   `);
        session.endDialog();
         
    }
])
.triggerAction({
    matches: /^MasInfo$/i,
   // "
});


bot.dialog('#Demo', [
    function (session) {
        session.send("Entrando al modo demo, te mostrare algunas de nuestras capacidades");
        //builder.Prompts.text(session, "Cuál es su nombre");  
        var cards = getCardsAttachments();
        
            // create reply with Carousel AttachmentLayout
            var reply = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments(cards);
            session.send(reply);
        



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
                // 
        session.send(`Datos de Contacto Nombre:  ${session.dialogData.nombre}<br/> Email: ${session.dialogData.email} `);
        session.send(`Tema:  ${session.dialogData.tema} `);
        mensaje.correoenviado(session.dialogData.nombre, session.dialogData.email,session.dialogData.telefono,session.dialogData.tema);
        session.send(`fin de contacto   `);
        session.endDialog();
         
    }
])
.triggerAction({
    matches: /^#Demo$/i,
   // "
});



function getCardsAttachments(session) {
    return [
        new builder.HeroCard(session)
            .title('Desarrollo de Bots')
            .subtitle('Automatización de Tareas - BOTs')
            .text('Nos enfocamos en desarrollar bots que mejoren la productividad junto con la rentabilidad financiera.')
            .images([
                builder.CardImage.create(session, 'http://tekh-ne.com/Media/Default/Images/bots/desarrollo-bots.png')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'http://tekh-ne.com/servicios/bots-automatizacion/index.html', 'Conozca más')
            ]),

        new builder.ThumbnailCard(session)
            .title('DocumentDB')
            .subtitle('Blazing fast, planet-scale NoSQL')
            .text('NoSQL service for highly available, globally distributed apps—take full advantage of SQL and JavaScript over document and key-value data without the hassles of on-premises or virtual machine-based cloud database options.')
            .images([
                builder.CardImage.create(session, 'https://docs.microsoft.com/en-us/azure/documentdb/media/documentdb-introduction/json-database-resources1.png')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/services/documentdb/', 'Learn More')
            ]),

        new builder.HeroCard(session)
            .title('Azure Functions')
            .subtitle('Process events with a serverless code architecture')
            .text('An event-based serverless compute experience to accelerate your development. It can scale based on demand and you pay only for the resources you consume.')
            .images([
                builder.CardImage.create(session, 'https://azurecomcdn.azureedge.net/cvt-5daae9212bb433ad0510fbfbff44121ac7c759adc284d7a43d60dbbf2358a07a/images/page/services/functions/01-develop.png')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/services/functions/', 'Learn More')
            ]),

        new builder.ThumbnailCard(session)
            .title('Cognitive Services')
            .subtitle('Build powerful intelligence into your applications to enable natural and contextual interactions')
            .text('Enable natural and contextual interaction with tools that augment users\' experiences using the power of machine-based intelligence. Tap into an ever-growing collection of powerful artificial intelligence algorithms for vision, speech, language, and knowledge.')
            .images([
                builder.CardImage.create(session, 'https://azurecomcdn.azureedge.net/cvt-68b530dac63f0ccae8466a2610289af04bdc67ee0bfbc2d5e526b8efd10af05a/images/page/services/cognitive-services/cognitive-services.png')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/services/cognitive-services/', 'Learn More')
            ])
    ];
}


module.exports = bot;