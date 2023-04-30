import { MyOrders } from '@/models/CheckoutSchema';
import db from '@/util/db';
import { getSession } from 'next-auth/react';

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

  const { response, amount, payment_method, cartId, addressId, paymentId } = req.body;
  console.log(amount, payment_method, cartId, addressId, paymentId);
  console.log(response.razorpay_payment_id);

  try {
    const order = new MyOrders({
      user: Id,
      cartitems: cartId,
      total: amount,
      shippingAddress: addressId,
      paymentId: response.razorpay_payment_id,
      status:'pending'
    });
    await order.save();
    await db.disconnect();
    res.status(200).json({ data:order, message: 'Order created successfully' });
  } catch (err) {
    await db.disconnect();
    res.status(500).json({ message: err.message });
  }
};

export default handler;
