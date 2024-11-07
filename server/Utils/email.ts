import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config()

export const sendMail = async function(options: { email: string; subject: string; text: string; }){

    const transporter = nodemailer.createTransport({
      host:"sandbox.smtp.mailtrap.io",
      port:2525,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      }
    });

    const mailOptions={
      from:"SHOPHUB <shophub2024@gmail.com>",
      to:options.email,
      subject:options.subject,
      text:options.text
    }

    transporter.sendMail(mailOptions, (err, result) => {
      if(err){
          console.log(err);
      }else{
          console.log("Email sent to :"+result);
      }
  })
 };


 