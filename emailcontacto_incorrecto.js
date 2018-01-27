function correo(nombrecontacto,emailcontacto,telefonocontacto,temacontacto) { 
'use strict';
const nodemailer = require('nodemailer');


// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing


nodemailer.createTestAccount((err, account) => {
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'mail.tekh-ne.com',
        port: 465,
        secure: false, // true for 465, false for other ports
        auth: {
            //user: account.user, // generated ethereal user
            //pass: account.pass  // generated ethereal password
            user :'carlos.aguilar@tekh-ne.com',
            pass :'jmlxuAYUN142{~{vcJWM65*'

        }
    });

    // setup email data with unicode symbols
    console.log ('en email contacto');
    
    let mailOptions = {
        from: '"Carlos Aguilar" <carlos.aguilar@tekh-ne.com>', // sender address
        to: `carlos_aguilar_ch@yahoo.com, caguilarplay@gmail.com , ${emailcontacto}`, // list of receivers
        subject: 'Tekh-ne Soluciones de Negocio - Seguimiento ✔', // Subject line
        text: `Muchas gracias ${nombrecontacto} por interesarse en nuestros servicios, en breve un ejecutivo lo contactará al ${telefonocontacto}`, // plain text body
        html: `<b>Muchas gracias ${nombrecontacto} por interesarse en nuestros servicios, en breve un ejecutivo lo contactará al ${telefonocontacto} </b> `  + 
        ` acerca de:  ${temacontacto} ` // html body
    };
   

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    });
    nombrecontacto = ""; 
    emailcontacto = "";
    telefonocontacto = "";
    temacontacto="";

});
}

module.exports.correoenviado = correo;
