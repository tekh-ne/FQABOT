//Tekh-ne Soluciones de Negocio
//qnadialog.js

'use strict';

const request = require('request');






module.exports = (session, args, next) => {
    session.sendTyping();
    const question = session.message.text;
    const bodyText = JSON.stringify({question: question});
    const uri = `https://westus.api.cognitive.microsoft.com/qnamaker/v1.0/knowledgebases/${process.env.KBID}/generateAnswer`;
    console.log(uri);

    request.post(uri, { body: bodyText }, (err, code, body) => {
        if(err) {
            console.log(err);
            session.endConversation('Lo siento, algo fue incorrecto.');
        } else {
            const response = JSON.parse(body);
            console.log(response);
            if(response.score > 50) {
                session.endConversation(response.answer);
            } else if (response.score > 0) {
                session.send(`No estoy seguro si esta respuesta es la mejor...`);
                session.endConversation(response.answer);
            } else {
                session.endConversation(`No tengo respuesta...`);
            }
        }
    }).setHeader('Ocp-Apim-Subscription-Key', process.env.SUBSCRIPTION_KEY);
};

