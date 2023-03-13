import db from '@/util/db';
import Product from '@/models/Product';

export default async function handler(req, res) {
    await db.connect();
    try {
        const products = await Product.find(); // Find all products in the database
        res.send(products)
        // Render the product list view and pass in the products as a variable
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
}