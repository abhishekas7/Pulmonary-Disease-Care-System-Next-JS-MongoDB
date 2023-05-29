
import formidable from "formidable";
import path, {join, resolve} from 'path'
import db from "@/util/db";
import Product from "@/models/Product";
const { v4: uuidv4 } = require('uuid');
import { getError } from "@/util/error";
const cloudinary = require('cloudinary').v2;


// Configuration 
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
  // const session = await getSession({ req });
    // if (!session) {
    //   return res.status(401).send('signin required');
    // }
    const optinos = {
        // uploadDir: join(resolve(), '/public/images'),
        keepExtensions: true,
        multiples: true ,
        maxFileSize: 10 * 1024 * 1024, // 10mb
        maxFieldsSize: 10 * 1024* 1024, // 10mb
        filename: function(name, ext, part, form) {
            return name + ext
        }
    }
    try{
  const form = new formidable.IncomingForm(optinos);
  form.parse(req, async function (err, fields, files) {
    if (err) {
      console.log(err);
    }
    console.log(fields);
    console.log(files.file.filepath);
    db.connect();
    let id=uuidv4();
   cloudinary.uploader.upload(files.file.filepath, {public_id: id}).then( (data) => {
    console.log( data.secure_url)
    const newUser = new Product({
      name: fields.name,
      description: fields.description,
      price: fields.price,
      manufacturer: fields.manufacturer,
      prescription_required: fields.prescription_required,
      image: data.secure_url,
      quantity: fields.quantity,
      category: fields.category,
    });
     newUser.save()
    console.log(newUser)
    db.disconnect();
    res.status(200).json({data:newUser,message:"Product Added Successfully"})
    }).catch((err) => {
    console.log(err);
    });
 
   
  });
}catch(e){
  console.log(getError(e))
  res.send({message:getError(e),status:false})
}
}

//localhost code
// import formidable from "formidable";
// import { join, resolve } from "path";
// import db from "@/util/db";
// import Product from "@/models/Product";
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
//     console.log(fields);
//     console.log(files);
//     db.connect();
//     const newUser = new Product({
//       name: fields.name,
//       description: fields.description,
//       price: fields.price,
//       manufacturer: fields.manufacturer,
//       prescription_required: fields.prescription_required,
//       image: files.file.newFilename,
//       quantity: fields.quantity,
//       category: fields.category,
//     });
//     db.disconnect();
//     res.status(200).json({data:newUser,message:"Product Added Successfully"})
//   });
// }
//git code
// import formidable from "formidable";
// import { join, resolve } from "path";
// import db from "@/util/db";
// import Product from "@/models/Product";
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
//     console.log(fields);
//     console.log(files);
//     db.connect();
//     const newUser = new Product({
//       name: fields.name,
//       description: fields.description,
//       price: fields.price,
//       manufacturer: fields.manufacturer,
//       prescription_required: fields.prescription_required,
//       image: files.file.newFilename,
//       quantity: fields.quantity,
//       category: fields.category,
//     });
//     db.disconnect();
//     res.status(200).json({data:newUser,message:"Product Added Successfully"})
//   });
// }
