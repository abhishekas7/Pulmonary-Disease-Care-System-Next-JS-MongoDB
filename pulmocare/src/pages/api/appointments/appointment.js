import Appointment from "@/models/Appointment";
import db from "@/util/db";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  db.connect()
  const session= getSession({req})
  const {user} = await session;
  // console.log(session);

  if (!user || user.role !== 'doctor') {
    res.status(401).json({ message: 'Unauthorklllizeds' });
    return;
  }

  if (req.method === 'GET') {
    try {
      const appointments = await Appointment.find({ doctor: user._id })
        .populate('doctor')
        .populate('patient');
      res.status(200).json(appointments);
      console.log(appointments);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  
  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
  db.disconnect()
};


  
