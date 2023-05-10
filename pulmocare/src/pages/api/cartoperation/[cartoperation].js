import cart from '@/models/CartSchema';
import db from '@/util/db';
import { getError } from '@/util/error';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const sess = await getSession({ req });
 
  if (!sess) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = sess.user._id;

  await db.connect();

  switch (req.method) {
    case 'GET':
      try {
  
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
      case 'POST':
        try {
       
      
          const { productId, price, name, quantity, image } = req.query;
      
          console.log(productId, price, name, quantity, image);
      
          let addtocart = await cart.findOne({ userId });
     
          if (!addtocart) {
            // create new cart if none exists for user
            addtocart = new cart({ userId, products: [] });
          }
      
     // check if product already exists in cart
const existingProductIndex = addtocart.products.findIndex(
  (product) => product.productId === productId
);

if (existingProductIndex > -1) {
  throw new Error('Product already exists in cart');
  
} else {
  // add new product to cart if it doesn't exist
  addtocart.products.push({
    productId,
    quantity,
    name,
    price,
    image,
  });
}

await addtocart.save();
res.status(200).json({ success: true, data: addtocart });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
        break;
      

    case 'PUT':
      try {

      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;

      case 'DELETE':
        try {
          const { itemId } = req.query;
        
        
          const cartDoc = await cart.findOne({ userId: userId, active: true });
    
        
          if (!cartDoc) {
            return res.status(404).json({ message: 'Cart not found' });
          }
        
      

          const result = await cart.findOneAndUpdate(
            { userId: userId, active: true },
            { $pull: { products: { productId: itemId } } },
            { new: true }
          );

    
        
        
          if (result.nModified === 0) {
            return res.status(404).json({ message: 'Product not found in cart' });
          }
        
          res.status(200).json({ success: true });
        } catch (error) {
          console.log(getError(error));
          res.status(500).json({ message: 'Internal server error' });
        }
        break;
      

    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }

  await db.disconnect();
}
