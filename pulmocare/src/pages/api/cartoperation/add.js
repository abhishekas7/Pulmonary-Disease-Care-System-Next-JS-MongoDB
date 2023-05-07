import cart from '@/models/CartSchema';
import db from '@/util/db';
import { getError } from '@/util/error';
import { getSession } from 'next-auth/react';


export default async function handler(req, res) {
  console.log('kkkkkkkkk');
  const sess = await getSession({ req });
 
  if (!sess) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = sess.user._id;

  await db.connect()
  switch (req.method) {
  case 'POST':
    try {

      console.log('ADDDDD');

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;

}
  await db.disconnect();

}