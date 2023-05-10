import formidable from "formidable";
import { join, resolve } from "path";
import db from "@/util/db";
import Product from "@/models/Product";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function Upload(req, res) {
  const optinos = {
    uploadDir: join(resolve(), "/public/images"),
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10mb
    maxFieldsSize: 10 * 1024 * 1024, // 10mb
    filename: function (name, ext) {
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
    const newUser = new Product({
      name: fields.name,
      description: fields.description,
      price: fields.price,
      manufacturer: fields.manufacturer,
      prescription_required: fields.prescription_required,
      image: files.file.newFilename,
      quantity: fields.quantity,
      category: fields.category,
    });
    db.disconnect();
    res.send("susessful");
  });
}
