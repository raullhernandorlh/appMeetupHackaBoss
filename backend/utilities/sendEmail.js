const nodemailer = require('nodemailer');  

// confirmación de registro
function sendEmailRegister (name, email) { 

    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'noelia37@ethereal.email',
        pass: 'ZVTFpp3VUQA1pQmrDm'
      }
    })
  
    let mailOptions = {
      from: 'raullopezhernando@gmail.com',
      to: email,
      subject: 'Bienvenido a APPMeetups',
      html: `<b>Gracias ${name} por registrarte en AppMeetup.</b><br>A partir de ahora podrás compartit tu tiempo y entusiasmo <b> con más geste en en AppMeetups. Somos lo que hacemos!!!.</b>`
     // html: 'pulsa <a href="localhost:8888/email?token">aquí</a> para activar tu cuenta'
    }
    
    transporter.sendMail(mailOptions)
  
   }


// const sendEmail = async(mail,name)=>{

//     let testAccount = await nodemailer.createTestAccount();

//     let transporter = nodemailer.createTransport({
//         host: process.env.EMAIL_HOST,
//         port: process.env.EMAIL_PORT,
//         secure: process.env.SECURE, 
//         auth: {
//             user: process.env.ETHEREAL_USER,
//             pass: process.env.ETHEREAL_USER_PASSWORD
//         },
//       });

//       let info = await transporter.sendMail({
//         from: process.env.EMAIL, // sender address
//         to: mail, // list of receivers
//         subject: "Register Confirmation", // Subject line
//         text: `Desde AppMeetup queremos ${name} darle la bienveida . Disfrute de nuestros multiples servicios.`, // plain text body
//         html: "<b>Desde <h1>AppMeetup</h1> queremos darle la bienvenida. Disfrute de nuestros multiples servicios.</b>", // html body
//       });

//       console.log("Message sent: %s", info.messageId);

//       console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// }

module.exports = {
  sendEmailRegister
}
