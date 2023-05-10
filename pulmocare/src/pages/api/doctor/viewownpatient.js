import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";
import db from "@/util/db";
import { getError } from "@/util/error";
import { getSession } from "next-auth/react";



export default async function handler(req, res) {
  const { method } = req;
  // console.log(Id);

  switch (method) {
    case "GET":
      await db.connect();
  const session = await getSession({ req });
  const { user } = session;
  console.log(user._id);


  const doctorsappointment = await Doctor.findOne({ user: user._id })
  .populate({
    path: 'appointments',
    match: { status: 'confirmed' },
    populate: {
      path: 'patient doctor',
      populate: {
        path: 'user'
      }
    },
  })
  .populate('user');

  res.send(doctorsappointment);
  break;
    case "POST":
      try {
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
      case "PUT":
        try {
          await db.connect();
          const { status,appId } = req.body
          console.log(status,appId);
          const appointment = await Appointment.findById(appId);
          if (appointment) {
           if(status==='confirmed')
            {
              try {
            
              } catch (error) {
                console.log(getError(error));
              }
            }else{
              try {
                const filter = { _id: appId };
                const update = { status: 'cancelled' };
                await Appointment.findOneAndUpdate(filter, update, {
                  new: 'true'
                });
              } catch (error) {
                console.log(getError(error));
              }
            }
          }
          res.send("Successful");
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
    case "DELETE":
      try {
        const deletedAppointment = await Appointment.deleteOne({
          _id: req.query.id,
        });
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
