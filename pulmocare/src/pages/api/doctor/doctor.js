import formidable from "formidable";
import { join, resolve } from "path";
import db from "@/util/db";
import User from "@/models/User";
import Doctor from "@/models/Doctor";
import bcrypt from 'bcrypt'
const { v4: uuidv4 } = require('uuid');
import { getError } from "@/util/error";
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
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
    let id=uuidv4();
   cloudinary.uploader.upload(files.file.filepath, {public_id: id}).then( (data) => {
    console.log( data.secure_url)
    const details = new Doctor({
      user:newUser._id,  
      status: fields.status,
      specialty: fields.specialty,
      description: fields.description,
      image: data.secure_url,
      experience: fields.experience,
      qualification: fields.qualification,
    });
    details.save()
    console.log(newUser)
    db.disconnect();
    // res.status(200).json({data: details,message:"Product Added Successfully"})
    res.status(200).json({data:details,message:"Successfull"})
    }).catch((err) => {
    console.log(err);
    });
  });
}

//git code
// <import formidable from "formidable";
// import { join, resolve } from "path";
// import db from "@/util/db";
// import User from "@/models/User";
// import Doctor from "@/models/Doctor";
// import bcrypt from 'bcrypt'

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function Upload(req, res) {
//   const optinos = {
//     uploadDir: join(resolve(), "/public/images"),
//     keepExtensions: true,
//     maxFileSize: 10 * 1024 * 1024, // 10mb
//     maxFieldsSize: 10 * 1024 * 1024, // 10mb
//     filename: function (name, ext) {
//       return name + ext;
//     },
//   };

//   const form = new formidable.IncomingForm(optinos);
//   form.parse(req, async function (err, fields, files) {
//     if (err) {
//       console.log(err);
//     }
//     // console.log(fields);
//     // console.log(files);
//     db.connect();
//     const saltRounds = 10;
//     const hash = bcrypt.hashSync(fields.password, saltRounds);
//     const newUser = new User({
//       name: fields.name,
//       email: fields.email,
//       password:hash,
//       role:"doctor"
//     });

//     const details = new Doctor({
//       user:newUser._id,  
//       status: fields.status,
//       specialty: fields.specialty,
//       description: fields.description,
//       image: files.file.newFilename,
//       experience: fields.experience,
//       qualification: fields.qualification,
//     });

//     db.disconnect();
//     res.status(200).json({data:details,message:"Successfull"})

//   });
// }
