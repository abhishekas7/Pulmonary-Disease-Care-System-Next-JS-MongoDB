import { getSession } from 'next-auth/react';
import Order from '@/models/Order';
import Product from '@/models/Product';
import db from '@/util/db';
import { getError } from '@/util/error';
import CartSchema from '@/models/CartSchema';

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
  console.log(req.body)
  try{
  const cart= await   CartSchema.findById(req.body.cart)
  for (const item of cart.products) {
    const product = await Product.findById(item.productId);
    console.log(product.quantity)
    console.log(item)
    product.quantity -= item.quantity;
    console.log(product)
    await product.save();
  }}catch(e){
    res.send({ message: getError(e),status:true });

  }
  const order = await newOrder.save();
  await db.disconnect();
  res.send({ message: 'Order placed successfully',status:true,data:order });
}catch(e){
  res.send({ message: getError(e),status:false });
}
};
export default handler;
