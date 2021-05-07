const nodemailer = require("nodemailer");
const express = require('express')
const app = express()
app.use(express.urlencoded({extended:true}))
// async..await is not allowed in global scope, must use a wrapper
async function main(client) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'user', // generated ethereal user
      pass: 'pass' // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: client, // list of receivers
    subject: "PedNewton ✔", // Subject line
    text: "Gambira", // plain text body
    html: "<a href='http://localhost:6060/'>Gambira?</a>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
 app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/views/logado.html')
  
 })
app.post('/',async (req,res)=>{
    if(req.body.email){
   await main(req.body.email).catch(console.error);
    }
    res.end('verifique seu email')
})
app.listen(3333)