import db from "@/util/db";
import { getSession } from "next-auth/react";
import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";
import Patient from "@/models/Patient";
import { getError } from "@/util/error";

//ZOOM
const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
const length = 10;
let link = "";
for (let i = 0; i < length; i++) {
  link += chars.charAt(Math.floor(Math.random() * chars.length));
}
link = `https://zoom.us/j/${link}`;

const appoId = Math.floor(10000 + Math.random() * 90000);
console.log(appoId);

function mailer(phonenumber, date, docname, email) {
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
        <title>PulmoCare Appointment Confirmation</title>
      </head>
      <body style="padding:20px; font-family: Arial, sans-serif; background-color: #f5f5f5; color: #333; text-align: center;">
        <h1 style="margin-top: 20px; margin-bottom: 30px;">PulmoCare Appointment Confirmation</h1>
        <p style="margin-bottom: 20px;">Dear Customer,</p>
        <p style="margin-bottom: 20px;">Your appointment with Dr. <strong style="font-weight: bold;">${docname}</strong> is confirmed on <strong style="font-weight: bold;">${date}</strong>.</p>
        <p style="margin-bottom: 20px;">Please use the Zoom link <a href="${link}" style="color: #007bff; text-decoration: none;">${link}</a> to join the virtual consultation.</p>
        <p style="margin-bottom: 20px;">Our customer care executive will connect you with the doctor.</p>
        <p style="margin-bottom: 20px;">Your appointment ID is <strong style="font-weight: bold;">${appoId}</strong>.</p>
        <p style="margin-bottom: 20px;">Thank you for choosing our online slot booking service.</p>
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

function sendsms(phonenumber, date, docname) {
  const accountSid = process.env.ACCOUNT_ID;
  const authToken = process.env.ACCOUNT_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: `' Hai Your appointment with Dr. ${docname} is confirmed on ${date}. Please use the Zoom link ${link} to join the virtual consultation. Our customer care executive will connect you with the doctor. Your appointment ID is ${appoId}. Thank you for choosing our online slot booking service.'`,
      messagingServiceSid: "MGb045d15ba59ecb30fa1af8d2c8be87e0",
      to: "+91" + phonenumber,
    })
    .then((message) => console.log(message.sid));
}

export default async function handler(req, res) {
  const session = await getSession({ req });
  const Id = session.user._id
  db.connect();
  
  try {
    const { doctor, date, reason, phonenumber } = req.body;
    
   
    const doctordetails = await Doctor.findById(doctor).populate("user");
    const docname = doctordetails.user.name;

    const pat = await Patient.findOne({user:Id})
    const appointment1 = await new Appointment({
      doctor: doctor,
      patient:pat._id,
      date: date,
      phonenumber: phonenumber,
      reason: reason,
    });

   

    sendsms(phonenumber, date, docname);
    const name = (await session).user.email;
    console.log(name);
    mailer(phonenumber, date, docname, name);
    const app = await appointment1.save();

    // Push the appointment to the doctor's appointments array
    await Doctor.findByIdAndUpdate(doctor, {
      $push: { appointments: appointment1._id },
    });

    // Push the appointment to the patient's appointments array
    await Patient.findByIdAndUpdate((await session).user._id, {
      $push: { appointments: appointment1._id },
    });
    res.send({ message: "Booking Sucessfull" });
  } catch (error) {
    res.send({ message: getError(error) });
  }
}
