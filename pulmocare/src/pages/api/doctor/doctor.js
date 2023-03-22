import formidable from "formidable";
import { join, resolve } from "path";
import db from "@/util/db";
import User from "@/models/User";
import Doctor from "@/models/Doctor";
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
    filename: function (name, ext, part, form) {
      return name + ext;
    },
  };

  const form = new formidable.IncomingForm(optinos);
  form.parse(req, async function (err, fields, files) {
    if (err) {
      console.log(err);
    }
    // console.log(fields);
    // console.log(files);
    db.connect();
    const newUser = new User({
      name: fields.name,
      email: fields.email,
      password: fields.password,
      role:"doctor"
    });
    const doctor = await newUser.save();

    const details = new Doctor({
      user:newUser._id,  
      status: fields.status,
      specialty: fields.specialty,
      description: fields.description,
      image: files.file.newFilename,
      experience: fields.experience,
      qualification: fields.qualification,
    });

    const doctor2 = await details.save();
    db.disconnect();
    res.send("susessful");

  });
}
