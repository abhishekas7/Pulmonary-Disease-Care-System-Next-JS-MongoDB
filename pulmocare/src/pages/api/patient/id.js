import db from "@/util/db";
import { getSession } from "next-auth/react";
import Patient from "@/models/Patient";

export default async function handler(req, res) {
    await db.connect();
    const session=getSession({req});
    const patients= await Patient.find({user:(await session).user._id});

    res.status(200).json(patients);
}