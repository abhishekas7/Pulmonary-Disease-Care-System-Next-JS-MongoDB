import db from "@/util/db";
import { getSession } from "next-auth/react";
import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";
import Patient from "@/models/Patient";
import { getError } from "@/util/error";

function Sendsms(phone){
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
      .create({body: 'Hi there', from: '+15017122661', to: '+15558675310'})
      .then(message => console.log(message.sid));
}

export default async function handler(req, res) {
  try {
    const session=getSession({req})
    // db.connect()
    const { doctor, patient, date, reason,phonenumber } = req.body;
    const appointment1 = await new Appointment({
      doctor:doctor,
      patient:(await session).user._id,
      date:date,
      phonenumber:phonenumber,
      reason:reason,
    });

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


    res.send({ message:'Udated' });
  } catch (error) {
    res.send({message:getError(error)});
  }
}