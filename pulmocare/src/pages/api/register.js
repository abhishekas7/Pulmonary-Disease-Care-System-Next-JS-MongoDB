// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from '@/models/Product';
import User from '@/models/User';
import data from '@/util/data';
import bcrypt from 'bcrypt'
import db from '@/util/db';




const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return;
  }
const { email,name ,password } = req.body;
  await db.connect();

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
//  const hashedPassword = await bcrypt(password,);
//email


 // Create new user
 const newUser = new User({
   email,
   name,
   password:hash,
 });
 

 try {
  const savedUser = await newUser.save();
  db.disconnect()
  res.status(201).json(savedUser);
} catch (err) {
  res.status(400).json({ message: err.message });
}
  await db.disconnect();
  res.send({ message: 'register successfully' });
};
export default handler;

