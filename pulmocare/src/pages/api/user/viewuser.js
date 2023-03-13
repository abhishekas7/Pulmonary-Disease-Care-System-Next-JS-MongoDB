import db from '@/util/db';
import User from '@/models/User';

export default async function handler(req, res) {
    await db.connect();
    try {
        const users = await User.find(); // Find all products in the database
        res.send(users)
        // Render the product list view and pass in the products as a variable
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
}