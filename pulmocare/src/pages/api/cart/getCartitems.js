import db from "@/util/db";
import CartSchema from "@/models/CartSchema";
import { getSession } from "next-auth/react";


export default async function handler(req, res) {
  const sess = await getSession({ req });

  if (!sess || !sess.user) {
    // Handle the case where `sess` or `sess.user` is null
    // For example, you could return an error response or redirect to a login page
  } else {
    const Id = sess.user._id;

    if (req.method === 'GET') {
      try {
        await db.connect()
        const cartItems = await CartSchema.find({ userId: Id, active: true }).populate('products');

        
        res.status(200).json({ cartItems });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
    }
  }
}
