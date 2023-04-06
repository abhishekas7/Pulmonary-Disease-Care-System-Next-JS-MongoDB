// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from '@/models/User';
import data from '@/util/data';
import bcrypt from 'bcrypt'
import db from '@/util/db';
import Otp from '@/models/Userverify';
import { getError } from '@/util/error';



const handler = async (req, res) => {

try {
  const { email,name ,password } = req.body;
  await db.connect();
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: 'User already exists' });
  }
  else{
    const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);

  function generateOTP() {
    var digits = '0123456789';
    var otpnumber = '';
    for (var i = 0; i < 4; i++) {
      otpnumber += digits[Math.floor(Math.random() * 10)];
    }
    return otpnumber;
  }

  var otpnumber =generateOTP()

 // Create new user
 const newUser = new User({
   email,
   name,
   password:hash,
   otp:otpnumber,
   status:false,
 });
 const savedUser = await newUser.save();  
 if(savedUser){
  res.send({ message: 'register successfully' },savedUser); 
 }
  }
 
  await db.disconnect();
} catch (error) {
  console.log(getError);
}



}
export default handler;

