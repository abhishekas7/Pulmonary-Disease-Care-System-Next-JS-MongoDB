import formidable from "formidable";
import { join, resolve } from "path";
import db from "@/util/db";

import { getSession } from "next-auth/react";
import Order from "@/models/Order";
import CartSchema from "@/models/CartSchema";
import Address from "@/models/Address";

export default async function Orders(req, res) {

  const sess = await getSession({ req });
  const userId = sess.user._id;
  db.connect();

  if (req.method === 'GET') {
    try {
      const orders = await Order.find({ user: userId })
      const cartId = orders[0].cart
      const addressId = orders[0].shippingAddress
      const cart = await CartSchema.findById(cartId)
      const address = await Address.findById(addressId)
      const data = {
        orders: orders,
        cart: cart,
        address: address
      };
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    } finally {
      db.disconnect();
    }
  }
}
