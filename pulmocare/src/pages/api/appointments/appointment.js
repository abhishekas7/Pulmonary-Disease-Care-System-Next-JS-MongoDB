import Appointment from '@/models/Appointment';
import Doctor from '@/models/Doctor';
import db from '@/util/db';
import { getSession } from 'next-auth/react';

db.connect();

export default async function handler(req, res) {
  const { method } = req;
  const sess = await getSession({ req });
  const Id = sess.user._id;
  // console.log(Id);

  switch (method) {
    case 'GET':
      try {

        const doc = await Doctor.find({user:Id}).populate('user');

      const docId = doc[0]._id
      const appointments = await Appointment.find({doctor:docId}).populate('patient');
        res.status(200).json({ success: true, data: appointments });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const appointment = await Appointment.create(req.body);
        res.status(201).json({ success: true, data: appointment });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedAppointment = await Appointment.deleteOne({ _id: req.query.id });
        if (!deletedAppointment) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
