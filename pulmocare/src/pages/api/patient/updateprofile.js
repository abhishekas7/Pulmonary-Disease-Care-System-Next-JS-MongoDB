// import Product from '../../../models/Product';
import Patient from "@/models/Patient";
import db from "@/util/db";
import { getError } from "@/util/error";
import { getSession } from "next-auth/react";
export default async function handler (req, res){

    const sess = getSession({ req });
    //   console.log(user);
    //   if (user) {
   
    // console.log((await sess).user);
if(req.method === 'PUT'){
    try {
        await db.connect();
        const us = await Patient.find({ user: (await sess).user._id });
        console.log(us);
        const [patient] = us;
        patient.age = req.body.values.age;
        patient.gender = req.body.values.gender;
        patient.mobile = req.body.values.mobile;
        patient.pincode = req.body.values.pincode;
        await patient.save();
        await db.disconnect();
        res.send({ message: "Updated successfully", status: true });
      } catch(e) {
        res.send({ message: getError(e) });
      }
}
      
    if (req.method == 'GET') {
        try {
      
        await db.connect();
        const sess = await getSession({ req });
        const userd = await Patient.findById({ user: sess.user._id });
        res.send(sess)
        } catch (error) {
            console.log(error);
        }
    }
}


  //   res.send(user.name);


