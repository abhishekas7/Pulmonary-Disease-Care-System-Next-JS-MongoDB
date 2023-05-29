/* eslint-disable no-case-declarations */
import { MyOrders } from "@/models/CheckoutSchema";
import db from "@/util/db";
import jsPDF from "jspdf";
import "jspdf-autotable";


export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        await db.connect();


        const ViewOrders = await MyOrders.find({})
          .populate("user")
          .populate("products.product")
          .populate("shippingAddress");

        res.json(ViewOrders);
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
