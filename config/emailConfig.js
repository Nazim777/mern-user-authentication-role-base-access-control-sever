import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
    service:'gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    
    secure: false, 
    auth: {
       
      user:process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS 
    },
  });
  export default transporter