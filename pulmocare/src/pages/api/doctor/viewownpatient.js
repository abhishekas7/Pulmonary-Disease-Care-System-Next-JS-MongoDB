import db from "@/util/db";
import User from "@/models/User";
import { getSession } from "next-auth/react";
import Doctor from "@/models/Doctor";
import Patient from "@/models/Patient";
import Appointment from "@/models/Appointment";

export default async function handler(req, res) {
  await db.connect();
  const session = await getSession({ req });
  const { user } = session;
  console.log(user._id);

  const doctorsappointment = await Doctor.findOne({ user: user._id })
    .populate({
      path: 'appointments',
      populate: {
        path: 'patient',
        
      },
    });

  res.send(doctorsappointment);
}
