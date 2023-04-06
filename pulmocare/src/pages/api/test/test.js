import db from '@/util/db';
import User from '@/models/User';

export default async function handler(req, res) {
  const { method } = req;

  await db.connect()

  switch (method) {
    case 'PUT':
      try {
        // const { email, otp } = req.body;
console.log('helo')
        const result = await User.update(
            { email: 'seena@gmail.com' },
            { $set: { otp: 32453 } }
        );
        await result.save()
        res.status(200).json({ success: true, user });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
