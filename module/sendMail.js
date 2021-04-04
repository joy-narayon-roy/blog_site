require('dotenv').config()
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:`${process.env.MAIL_ID}`,
        pass:`${process.env.MAIL_PASS}`
    }
})


const mailOptions = {
  from: `${process.env.MAIL_ID}`,
  to: 'bjoyroy4444@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'Send By Node.js'
};

transporter.sendMail(mailOptions,(err,data)=>{
    if (err) {
        console.error('Failed ! Some Error occurs.')
    }else{
        console.log('Successfully Sand !');
    }
})