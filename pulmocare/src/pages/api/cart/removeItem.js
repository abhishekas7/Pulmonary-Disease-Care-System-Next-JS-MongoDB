import db from '@/util/db';
import CartSchema from '@/models/CartSchema';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const sess = await getSession({ req });
  const userId = sess.user._id;
 
  await db.connect()

  if (req.method === 'DELETE') {
  
    const productId = req.body.itemId;
    const cartId = req.body.cartId;

    try {
      const cart = await CartSchema.findOne({ userId: userId, active: true });

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
    
      const updatedProducts = cart.products.filter((product) => product._id.toString() !== productId);
    
      const result = await CartSchema.updateOne(
        { _id: cartId },
        { $set: { products: updatedProducts } }
      );


    
    
      if (result.nModified === 0) {
        return res.status(404).json({ message: 'Product not found in cart' });
      }
    
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
