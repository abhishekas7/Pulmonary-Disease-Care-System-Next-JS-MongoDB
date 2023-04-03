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
    const doc = await Doctor.findOne({ user: user._id });
    const appointments = await Appointment.find({ doctor: doc._id }).populate('patient');
    // const patientIds = appointments.map((appointment) => appointment.patient._id);
    // const patients = await Patient.find({ _id: { $in: patientIds } }).populate('user', '_id name email role');
    console.log(patients);
    res.send(appointments);
}
