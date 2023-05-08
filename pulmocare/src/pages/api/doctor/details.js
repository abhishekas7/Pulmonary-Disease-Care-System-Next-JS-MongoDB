import db from "@/util/db";
import Doctor from "@/models/Doctor";
import { getSession } from "next-auth/react";
import { getError } from "@/util/error";

export default async function handler(req, res) {
    await db.connect();
    try{
    const session = await getToken({ req: req, secret: process.env.SECRET });
    // console.log(session.user._id)
    const doctor = await Doctor.find({user:session._id});
    // console.log(doctor)
    res.send(doctor)
    }catch(e){
    res.send(getError(e))
    }

}