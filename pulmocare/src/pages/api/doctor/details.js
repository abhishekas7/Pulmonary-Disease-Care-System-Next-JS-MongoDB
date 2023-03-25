import db from "@/util/db";
import Doctor from "@/models/Doctor";
import { getSession } from "next-auth/react";
import { getError } from "@/util/error";

export default async function handler(req, res) {
    await db.connect();
    try{
    const session =await getSession({req})
    console.log(session.user._id)
    const doctor = await Doctor.find({user:session.user._id});
    console.log(doctor)
    res.send(doctor)
    }catch(e){
    res.send(getError(e))
    }

}