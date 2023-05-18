import User from "@/models/User";
import db from "@/util/db";
import { getToken } from "next-auth/jwt";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'PUT':
      handlePutRequest(req, res);
      break;
    default:
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const handlePutRequest = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  await db.connect();
  const session = await getToken({ req: req, secret: process.env.SECRET });

  const userId = session._id;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the current password matches the encrypted password in the database
    const isCurrentPasswordValid = bcrypt.compareSync(currentPassword, user.password);
    console.log(isCurrentPasswordValid);

    if (!isCurrentPasswordValid) {
      return res.status(401).json({ error: 'Invalid current password' });
    }

    // Encrypt the new password
    const newEncryptedPassword = bcrypt.hashSync(newPassword, 10); // Use appropriate salt rounds

    // Update the user's password
    user.password = newEncryptedPassword;
    await user.save();

    // Return success response
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update password' });
  } finally {
    db.disconnect();
  }
}
