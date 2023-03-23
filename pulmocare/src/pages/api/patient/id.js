import db from "@/util/db";
import User from "@/models/User";
import { getSession } from "next-auth/react";
import Patient from "@/models/Patient";

export default async function handler(req, res) {
    await db.connect();
    const session=getSession({req});
    const {user}=session
    const patients= await Patient.find({user:(await session).user._id});
    console.log(patients)
    res.status(200).json(patients);
}