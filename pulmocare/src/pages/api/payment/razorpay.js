
import { MyOrders } from '@/models/CheckoutSchema';
import Patient from '@/models/Patient';
import db from '@/util/db';
import { getSession } from 'next-auth/react';
import Razorpay from 'razorpay';


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});




const handler = async (req, res) => {
    await db.connect();
    const sess = await getSession({ req });
    const Id = sess.user._id;

    
  
    if (!sess) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
  
    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Method Not Allowed' });
      return;
    }
  
    const {amount, currency, payment_method} = req.body;
    
    const payment_capture = 1;
    const notes = { email: sess.user.email };
  
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

    

      
  };
  
  export default handler;
  
