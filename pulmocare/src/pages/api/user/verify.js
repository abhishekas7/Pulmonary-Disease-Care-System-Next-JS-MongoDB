import db from "@/util/db";
import User from "@/models/User";
import { getError } from "@/util/error";
export default async function handler(req, res) {
  try {
    db.connect()
    const { email, otp } = req.body;
    const user = await User.findOne({email:email,otp:otp,status:false});
    if (!user) {
      return res.status(401).json({ message: 'Invalid OTP or user is inactive' });
    }
    else{
      await User.updateOne({ email, otp }, { $set: { status: true } });

    }

    return res.status(200).json({ message: 'OTP verified successfully' });
  

  } catch (error) {
    console.log(getError(error));
    db.disconnect();
    return res.status(500).json({ message: 'Internal server error' });
  }

}
