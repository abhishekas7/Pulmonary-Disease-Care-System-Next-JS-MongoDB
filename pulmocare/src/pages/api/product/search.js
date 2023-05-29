import Product from '@/models/Product';
import db from '@/util/db';

export default async function handler(req, res) {
  const { query } = req.query;

  console.log(query);

  try {
    await db.connect();

    let products = [];

    if (query) {
      // Modify the search logic
      products = await Product.find({
        name: { $regex: `\\b${query}`, $options: 'i' },
        status: true,
      }).lean();
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
}
    