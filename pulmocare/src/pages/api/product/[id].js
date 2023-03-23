import db from "@/util/db";
import Product from "@/models/Product";

export default async function handler(req, res) {
    await db.connect();
    // const { id } = req.query;
    const product = await Product.findById(req.query.id);
    res.send(product);
}