// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from '@/models/User';
import data from '@/util/data';
import bcrypt from 'bcrypt'
import db from '@/util/db';
import Otp from '@/models/Userverify';
import { getError } from '@/util/error';
import Patient from '@/models/Patient';

function mailer(email,otpnumber,verifylink) {
  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pulmocare65@gmail.com",
      pass: "lqffgcjgjccwaqlo",
    },
  });

  var mailOptions = {
    from: "pulmocare65@gmail.com",
    to: email,
    subject: "PulmoCare",
    html: `<html>
    <head>
      <meta charset="UTF-8">
      <title>OTP Verification</title>
      <style>
        body {
          background-color: #f6f6f6;
          font-family: Arial, sans-serif;
          text-align: center;
        }
        h1 {
          color: #4d4d4d;
          margin-top: 30px;
          margin-bottom: 0;
        }
        p {
          color: #4d4d4d;
          font-size: 16px;
          line-height: 1.5;
          margin-top: 10px;
          margin-bottom: 20px;
        }
        strong {
          color: #36c;
          font-weight: bold;
        }
        a {
          color: #36c;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <h1>OTP Verification</h1>
      <p>Dear Customer,</p>
      <p>Your OTP is <strong>${otpnumber}</strong>. Please enter this code to verify your account.</p>
      <p>Alternatively, you can click <a href="${verifylink}">here</a> to verify your account.</p>
    </body>
  </html>
  
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

const handler = async (req, res) => {

try {
  const { email,name ,password } = req.body;
  await db.connect();
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: 'User already exists' });
  }
  else{
    const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);

  function generateOTP() {
    var digits = '0123456789';
    var otpnumber = '';
    for (var i = 0; i < 4; i++) {
      otpnumber += digits[Math.floor(Math.random() * 10)];
    }
    return otpnumber;
  }

  var otpnumber =generateOTP()

  var verifylink = 'http://localhost:3000/Emailverify'

 // Create new user
 const newUser = new User({
   email,
   name,
   password:hash,
   otp:otpnumber,
   status:false,
 });
 const savedUser = await newUser.save(); 

 const newPatient = new Patient({
  email:email,
  username:name,
});
await newPatient.save(); 
 
 if(savedUser){
  mailer(email,otpnumber,verifylink);
  res.send({ message: 'register successfully' },savedUser); 
 }
  }
 
  await db.disconnect();
} catch (error) {
  console.log(getError);
}



}
export default handler;

