import formidable from "formidable";
import { join, resolve } from "path";
import db from "@/util/db";

import { getSession } from "next-auth/react";
import moment from "moment";
import Product from "@/models/Product";



export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function EditProduct(req, res) {

  const sess = await getSession({ req });
  const userId = sess.user._id;
  if (req.method === "PUT") {
    const options = {
      uploadDir: join(resolve(), "/public/images"),
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10mb
      maxFieldsSize: 10 * 1024 * 1024, // 10mb
      filename: function (name, ext, part, form) {
        return name + ext;
      },
    };

    const form = new formidable.IncomingForm(options);
    form.parse(req, async function (err, fields, files) {
      if (err) {
        console.log(err);
        res.status(500).send("Error parsing form data.");
        return;
      }
      // console.log(fields);


      try {
    
        const {editproduct} =req.query
      
        const product = await Product.findById(editproduct);
        if(product===0){
          console.log('hi');
        }
        else{
          console.log('no');
        }



        await db.connect();
      } catch (error) {
        console.log(error);
        res.status(500).send("Error connecting to the database.");
      } finally {
        await db.disconnect();
      }
    });
  } 





}
