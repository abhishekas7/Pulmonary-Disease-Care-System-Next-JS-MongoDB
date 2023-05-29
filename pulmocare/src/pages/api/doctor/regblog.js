
import BlogPost from "@/models/BlogPost";
import db from "@/util/db";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { title, category, description } = req.body;

      await db.connect();
      const session = await getToken({ req: req, secret: process.env.SECRET });

      const newBlogPost = new BlogPost({
        title,
        category,
        description,
        author: session.name,
      });

      await newBlogPost.save();

      res.status(200).json({ message: "Insertion successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error: Insertion failed" });
    } finally {
      db.disconnect();
    }
  } else if (req.method === "GET") {
    try {
      await db.connect();

      const blogPosts = await BlogPost.find({}).exec();

      res.status(200).json(blogPosts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error: Fetching data failed" });
    } finally {
      db.disconnect();
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
