import db from "@/util/db";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const sess = await getSession({ req });
    if (!sess) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const userId = sess.user._id;
    console.log(userId);
  
    await db.connect()
    // rest of the code...
  }
  