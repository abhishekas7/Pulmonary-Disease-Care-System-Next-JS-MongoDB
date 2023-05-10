import formidable from "formidable";
import { join, resolve } from "path";
import db from "@/util/db";
import User from "@/models/User";
import Doctor from "@/models/Doctor";
import bcrypt from 'bcrypt'

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
    // console.log(fields);
    // console.log(files);
    db.connect();
    const saltRounds = 10;
    const hash = bcrypt.hashSync(fields.password, saltRounds);
    const newUser = new User({
      name: fields.name,
      email: fields.email,
      password:hash,
      role:"doctor"
    });

    const details = new Doctor({
      user:newUser._id,  
      status: fields.status,
      specialty: fields.specialty,
      description: fields.description,
      image: files.file.newFilename,
      experience: fields.experience,
      qualification: fields.qualification,
    });

    db.disconnect();
    res.status(200).json({data:details,message:"Successfull"})

  });
}
