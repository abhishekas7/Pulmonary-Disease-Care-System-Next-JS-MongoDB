import { getSession } from "next-auth/react";
import Order from "@/models/Order";
import Product from "@/models/Product";
import db from "@/util/db";
import { getError } from "@/util/error";
import CartSchema from "@/models/CartSchema";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("signin required");
  }

  const { user } = session;
  try {
    await db.connect();

    const order = await Order.findById(req.query.id);
    order.cart = req.body.cart;
    order.shippingAddress = req.body.shippingAddress;
    order.itemsPrice = req.body.itemsPrice;
    order.shippingPrice = req.body.shippingPrice;
    order.taxPrice = req.body.taxPrice;
    order.totalPrice = req.body.totalPrice;
    console.log(req.body);
    try {
      const cart = await CartSchema.findById(req.body.cart);
      for (const item of cart.products) {
        const product = await Product.findById(item.productId);
        console.log(product.quantity);
        console.log(item);
        product.quantity -= item.quantity;
        console.log(product);
        await product.save();
      }
    } catch (e) {
      res.send({ message: "error @ product", status: true });
    }
    const order1 = await order.save();
    await db.disconnect();
    res.send({
      message: "Order Placed Successfully",
      status: true,
      data: order1,
    });
  } catch (e) {
    res.send({ message: "Error at new order", status: false });
  }
};
export default handler;
