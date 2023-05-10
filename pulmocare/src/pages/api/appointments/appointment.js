import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";
import Patient from "@/models/Patient";
import db from "@/util/db";
import { getError } from "@/util/error";
import { getSession } from "next-auth/react";

db.connect();

export default async function handler(req, res) {
  const { method } = req;
  const sess = await getSession({ req });
  const Id = sess.user._id;
  // console.log(Id);

  switch (method) {
    case "GET":
      try {
        const doc = await Doctor.find({ user: Id }).populate("user");
        const docId = doc[0]._id;
        const appointments = await Appointment.find({ doctor: docId });
        const patientIds = appointments.map((appointment) => appointment.patient);
      
        // Get the patient details for all the patient IDs
        const patientPromises = patientIds.map((patientId) => {
          return Patient.findOne({ _id: patientId }).populate('user');
        });
      
        const patients = await Promise.all(patientPromises);
        // array of patient objects
        
        const combinedData = patients.map((patient, index) => {
          return {
            ...patient.toObject(),
            ...appointments[index].toObject()
          }
        });

        res.status(200).json({ data: combinedData });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      }
      
      
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
                const filter = { _id: appId };
                const update = { status: 'confirmed' };
            
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
