/* eslint-disable no-case-declarations */
import { MyOrders } from "@/models/CheckoutSchema";
import db from "@/util/db";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const { method } = req;
  // console.log(Id);

  switch (method) {
    case "GET":
      await db.connect();
      const session = await getToken({ req: req, secret: process.env.SECRET });
      console.log(session);
      const ViewOrders = await MyOrders.find({});
      res.send(ViewOrders);
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
