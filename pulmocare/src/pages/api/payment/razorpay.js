import { getToken } from 'next-auth/jwt';
import Razorpay from 'razorpay';
import db from '@/util/db';


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

export default async function handler(req, res) {
  await db.connect();
  const sess = await getToken({ req: req, secret: process.env.SECRET });
  const Id = sess._id;
  console.log(Id);
  if (!sess) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const {amount, currency, payment_method} = req.body;

  console.log(amount);
   
  const payment_capture = 1;
  const notes = { email: sess.email };
  try {
    const payment = await razorpay.orders.create({
      amount: amount,
      currency: currency,
      payment_capture: payment_capture,
      notes: notes,
      payment_method:payment_method,
    });
    res.status(200).json({ id: payment.id,amount:payment.amount });
    await db.disconnect();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}