import { getSession } from 'next-auth/react';
import Order from '@/models/Order';
import Product from '@/models/Product';
import db from '@/util/db';
import { getError } from '@/utils/error';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('signin required');
  }

  const { user } = session;
  try{
  await db.connect();
  
  const newOrder = new Order({
    ...req.body,
    user: user._id,
  });
  try{
  for (const item of newOrder.orderItems) {
    const product = await Product.findById(item._id);

    product.quantity -= item.cartquantity;
    console.log(product)
    await product.save();
  }}catch(e){
    res.send({ message: getError(e),status:true,data:order });

  }
  const order = await newOrder.save();
  await db.disconnect();
  res.send({ message: 'Order placed successfully',status:true,data:order });
}catch(e){
  res.send({ message: getError(e),status:false });
}
};
export default handler;
