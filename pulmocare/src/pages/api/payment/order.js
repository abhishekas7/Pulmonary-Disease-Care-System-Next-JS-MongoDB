import cart from '@/models/CartSchema';
import { MyOrders } from '@/models/CheckoutSchema';
import Product from '@/models/Product';
import db from '@/util/db';
import { getError } from '@/util/error';
import { getToken } from 'next-auth/jwt';

const handler = async (req, res) => {
  await db.connect();
  const sess = await getToken({ req: req, secret: process.env.SECRET });
  const Id = sess._id;

  if (!sess) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { response, cartId, addressId } = req.body;
  // console.log(amount, payment_method, cartId, addressId, paymentId);
  // console.log(response.razorpay_payment_id);
  try {
    const productsInCart = await cart.findById(cartId).populate('products');
    
    const allProducts = productsInCart.products.map(item => ({
      product: item.productId, // include the product field
      quantity: item.quantity,
      name: item.name,
      price: item.price,
      image: item.image,
      _id: item._id
    }));
  
    const total = allProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
    const order = new MyOrders({
      user: Id,
      products: allProducts,
      total: total,
      shippingAddress: addressId,
      paymentId: response.razorpay_payment_id,
      status: 'pending'
    });
    await order.save();

      // update the quantity of each product in the database
  for (const item of allProducts) {
    await Product.findByIdAndUpdate(item.product, { $inc: { quantity: -item.quantity } });
  }

      // remove the cart items from the cart collection
  await cart.findByIdAndUpdate(cartId, { $set: { products: [] } });

  res.status(201).json({ message: 'Order created successfully' });


  
  } catch (error) {
    // handle error
    console.log(getError(error));
  }
  
};

export default handler;
