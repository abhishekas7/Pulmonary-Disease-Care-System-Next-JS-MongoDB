import formidable from "formidable";
import { join, resolve } from "path";
import db from "@/util/db";
import Product from "@/models/Product";
import { getError } from "@/util/error";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function Upload(req, res) {
    try{
  const optinos = {
    uploadDir: join(resolve(), "/public/images"),
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10mb
    maxFieldsSize: 10 * 1024 * 1024, // 10mb
    filename: function (name, ext, part, form) {
      return name + ext;
    },
  };

  const form = new formidable.IncomingForm(optinos);
  form.parse(req, async function (err, fields, files) {
    if (err) {
      console.log(err);
    }
    console.log(fields);
    console.log(files);
    db.connect();
    const prod = await Product.findById(fields.id)
    if(prod){  
      prod.name= fields.name,
      prod.description= fields.description,
      prod.price= fields.price,
      prod.manufacturer= fields.manufacturer,
      prod.prescription_required= fields.prescription_required,
      prod.image= files.file.newFilename,
      prod.quantity= fields.quantity,
      prod.category=fields.category;
    }
    console.log(fields.name);
    const order = await prod.save();
    
    db.disconnect();
    res.send("successful");
});
}catch(e){
    console.log(getError(e))
}
 
}
