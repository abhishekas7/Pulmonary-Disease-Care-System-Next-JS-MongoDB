import db from "@/util/db";
import Product from "@/models/Product";

export default async function handler(req, res) {
    await db.connect();
    const { id } = req.query;
    const product = await Product.findOne({ _id: id });
    res.status(200).json(product);
  }