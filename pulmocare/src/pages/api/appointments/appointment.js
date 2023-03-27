import Appointment from "@/models/Appointment";
import db from "@/util/db";
import Doctor from "@/models/Doctor";

import { getSession } from "next-auth/react";
import Patient from "@/models/Patient";

export default async function handler(req, res) {
  db.connect()
  const session= getSession({req})
  const {user} = await session;
   console.log(user);

  if (!user || user.role !== 'doctor') {
    res.status(401).json({ message: 'Unauthorklllizeds' });
    return;
  }

  if (req.method === 'GET') {
    try {
   
      const doctor = await Doctor.findOne({user:user._id} )
        .populate('user');
        const appointments = await Appointment.find({doctor:doctor._id})
        .populate('patient');


      res.send({appointments,doctor});
    
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  
  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
  db.disconnect()
};




  
