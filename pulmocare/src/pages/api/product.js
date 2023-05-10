
import Product from '@/models/Product';
import db from '@/util/db';

const handler = async (req, res) => {
  await db.connect();
  const data=await Product.find() 
  await db.disconnect();
  res.send(data);
};
export default handler;

