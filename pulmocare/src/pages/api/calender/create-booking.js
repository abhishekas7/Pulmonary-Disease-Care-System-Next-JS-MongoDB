import db from "@/util/db";
import { getSession } from "next-auth/react";
import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";
import Patient from "@/models/Patient";
import { getError } from "@/util/error";


function sendsms(phonenumber,date,docname) {
  //ZOOM
const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
const length = 10;
let link = '';
for (let i = 0; i < length; i++) {
  link += chars.charAt(Math.floor(Math.random() * chars.length));
}
link = `https://zoom.us/j/${link}`;


  const appoId =Math.floor(10000 + Math.random() * 90000);
  console.log(appoId);

  
  const accountSid = process.env.ACCOUNT_ID; 
  const authToken = process.env.ACCOUNT_TOKEN; 
  const client = require('twilio')(accountSid, authToken); 
   
  client.messages 
        .create({ 
           body: `' Hai Your appointment with Dr. ${docname} is confirmed on ${date}. Please use the Zoom link ${link} to join the virtual consultation. Our customer care executive will connect you with the doctor. Your appointment ID is ${appoId}. Thank you for choosing our online slot booking service.'`,  
           messagingServiceSid: 'MGb045d15ba59ecb30fa1af8d2c8be87e0',      
           to: '+91'+phonenumber  
           
         })
        .then(message => console.log(message.sid)) 

}

export default async function handler(req, res) {
  const session =getSession({req})
  db.connect()
  try {
   const { doctor, patient, date, reason,phonenumber } = req.body;
  //  console.log(doctor)
    const doctordetails = await Doctor.findById(doctor).populate('user');
    const docname=doctordetails.user.name;
    const appointment1 = await new Appointment({
      doctor:doctor,
      patient:(await session).user._id,
      date:date,
      phonenumber:phonenumber,
      reason:reason,
    });
    console.log(appointment1);
 sendsms(phonenumber,date,docname)
    const app= await appointment1.save()
   
    // Push the appointment to the doctor's appointments array
await Doctor.findByIdAndUpdate(
  doctor,
  { $push: { appointments: appointment1._id } }
);

// Push the appointment to the patient's appointments array
await Patient.findByIdAndUpdate(
  (await session).user._id,
  { $push: { appointments: appointment1._id } }
);
    res.send({ message:'Booking Sucessfull' });
  } catch (error) {
    res.send({message:getError(error)});
  }
}