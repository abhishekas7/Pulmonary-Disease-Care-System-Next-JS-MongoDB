import { getSession } from 'next-auth/react';
import Order from '@/models/Order';
import db from '@/util/db';

const handler = async (req, res) => {
    try{
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('Error: signin required');
  }

  await db.connect();
  const order = new Order({
    isPaid:true,
    paymentResult :{
        id: req.body.id,
        status: req.body.status,
        email_address: req.body.email_address,
      },
    user: session.user._id,
  });
    const paidOrder = await order.save();
    await db.disconnect();
    
    res.send({ message: 'Payment successfull', order: paidOrder,status:true });
}catch(e){
    res.send({ message: 'Payment successfull',status:false });
}
};
export default handler;
