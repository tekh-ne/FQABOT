

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
        builder.Prompts.text(session, "Cuál es su nombre?");        
    },
    function (session, results ) {
        session.dialogData.nombre = results.response;
        builder.Prompts.text(session, "¿Cuál es su correo:?");       
        
    },
    function (session, results) {
        session.dialogData.email = results.response;
        builder.Prompts.text (session, "¿Cuál es su teléfono de contacto?");        
    },
    function (session, results) {
        session.dialogData.telefono = results.response;
        builder.Prompts.text (session, "¿Qué tema le interesa?");        
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
        session.send("Entrando al modo demo, te mostrare algunas de nuestros servicios");
        builder.Prompts.text(session, "Cuál es su nombre?"); 
        
        
    },
    function (session,results) {
            session.dialogData.nombre = results.response;
            var cards = getCardsAttachments();
        
            // create reply with Carousel AttachmentLayout
            var reply = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments(cards);
            session.send(reply);
            session.send(`Gracias   ${session.dialogData.nombre}<br/> Saliendo del modo demo.. `);
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
            .title('Desarrollo Web')
            .subtitle('Creamos aplicaciones web excepcionales.')
            .text('Valoramos las soluciones prácticas, diseños bellos e inteligentes, código limpio, buena arquitectura y, sobre todo, estamos comprometidos con el éxito de su empresa.')
            .images([
                builder.CardImage.create(session, 'http://tekh-ne.com/Media/Default/Images/bots/desarrollo-a-la-medida.png')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'http://tekh-ne.com/servicios/web-application-development/index.html', 'Conozca más')
            ]),

        new builder.HeroCard(session)
            .title('Desarrollo Móvil')
            .subtitle('Creamos aplicaciones móviles geniales')
            .text('Proporcionamos servicios integrales para el desarrollo de aplicaciones móviles para todas las plataformas principales, incluyendo iOS de Apple y Android de Google')
            .images([
                builder.CardImage.create(session, 'http://tekh-ne.com/Media/Default/Images/bots/desarrollo-movil.png')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'http://tekh-ne.com/servicios/mobile-application-development/index.html', 'Conozca más')
            ]),

        new builder.ThumbnailCard(session)
            .title('Soluciones con Base de Datos')
            .subtitle('Desarrollamos aplicaciones de bases de datos para una variada clientela')
            .text('Nos centramos en aplicaciones de bases de datos personalizadas utilizando tecnologías avanzadas y personal experto para crear soluciones fáciles de usar, eficientes y confiables.')
            .images([
                builder.CardImage.create(session, 'http://tekh-ne.com/Media/Default/Images/bots/json-database-resources1.png')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'http://tekh-ne.com/servicios/database-development/index.html', 'Conozca más')
            ])
    ];
}


module.exports = bot;