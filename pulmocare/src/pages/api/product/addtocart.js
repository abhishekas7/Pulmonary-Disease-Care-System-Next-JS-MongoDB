import CartSchema from "@/models/CartSchema";
import db from "@/util/db";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  try {
    await db.connect();
    const sess = await getSession({ req });
    const userId = sess.user._id;

    const { productId, quantity, name, price, image } = req.body;

    let cart = await CartSchema.findOne({ userId });
    if (!cart) {
      // create new cart if none exists for user
      cart = new CartSchema({ userId, products: [] });
    }

    // check if product already exists in cart
    const existingProductIndex = cart.products.findIndex(
      (product) => product.productId === productId
    );

    if (existingProductIndex > -1) {
      // update quantity if product already exists
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // add new product to cart if it doesn't exist
      cart.products.push({
        productId,
        quantity,
        name,
        price,
        image,
      });
    }

    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
}
