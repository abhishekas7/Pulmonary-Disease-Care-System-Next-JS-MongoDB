import CartSchema from "@/models/CartSchema"
import Product from "@/models/Product"
import db from "@/util/db"

export default async function handler(req, res) {
  const { productId } = req.body
  console.log(productId);
  await db.connect()

  if (req.method === 'PUT') {
    try {
      
      // Find the product in the database and increment its quantity
      const product = await Product.findOneAndUpdate(
        { _id: productId }, 
        { $inc: { quantity: -1 } },
        { new: true } // return the updated document
      );


      if (!product) {
        res.status(404).json({ message: 'Product not found' });
      }
       else {
        // Update the cart item with the matching product ID
        const cartItem = await CartSchema.findOneAndUpdate(
          { "products.productId": productId },
          { $inc: { "products.$.quantity": 1 } },
          { new: true }
        );
        

        res.status(200).json(cartItem);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
