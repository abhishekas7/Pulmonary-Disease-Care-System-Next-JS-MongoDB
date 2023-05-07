import db from '@/util/db';
import Product from '@/models/Product';

export default async function handler(req, res) {
  const { method } = req
await db.connect();
  switch (method) {
    case 'GET':
      try {
        const products = await Product.find(); 
        res.status(200).json({ data: products });
        db.disconnect();
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
      break;
    case 'POST':
      // Handle POST request for creating data
      res.status(201).json({ message: 'Creating data' })
      break
    case 'PUT':
      try {
        await db.connect();
        const { status,productId } = req.body

        const pro = await Product.findById(productId);
        if (pro) {
         if(status==='true')
          {
            try {
              const filter = { _id: productId };
              const update = { status: 'true' };
              const doc = await Product.findOneAndUpdate(filter, update, {
                new: 'true'
              });
          
            } catch (error) {
              console.log(getError(error));
            }
          }else{
            try {
              const filter = { _id: productId };
              const update = { status: 'false' };
              await Product.findOneAndUpdate(filter, update, {
                new: 'true'
              });
            } catch (error) {
              console.log(getError(error));
            }
          }
        }
        res.send("Successful");
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
      break
    case 'DELETE':
      // Handle DELETE request for deleting data
      res.status(204).json({ message: 'Deleting data' })
      break
    default:
      // Handle unsupported HTTP methods
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
