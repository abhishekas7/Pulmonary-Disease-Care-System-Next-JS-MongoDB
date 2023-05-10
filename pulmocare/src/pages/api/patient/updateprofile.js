import formidable from "formidable";
import { join, resolve } from "path";
import db from "@/util/db";
import Patient from "@/models/Patient";
import { getSession } from "next-auth/react";
import moment from "moment";
import User from "@/models/User";


export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function Upload(req, res) {

  const sess = await getSession({ req });
  const userId = sess.user._id;

  if (req.method === 'GET') {
    try {
      const patients = await Patient.find({user:userId}).populate('user');
      res.status(200).json(patients);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  } 

  if (req.method === "PUT") {
    const options = {
      uploadDir: join(resolve(), "/public/images"),
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10mb
      maxFieldsSize: 10 * 1024 * 1024, // 10mb
      filename: function (name, ext) {
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
        console.log(userId);

        await db.connect();
        const user = await User.findById(userId);
        console.log(user);
        const patient = await Patient.findOne({ user: userId });
    
        if (patient) {
          // Update existing patient document
     
          // await Patient.updateOne({ user: userId }, { ...updateData });

          await Patient.updateOne(
            { user: userId },
            {
              $set: {
                name: {
                  first: fields['name.first'],
                  last: fields['name.last']
                },
                email:user.email,
                address: {
                  street: fields['address.street'],
                  city: fields['address.city'],
                  state: fields['address.state'],
                  zip: fields['address.zip']
                },
                age: fields.age,
                image: files.file.newFilename,
                mobile: fields.mobile,
                gender: fields.gender,
                dateOfBirth:moment(fields.dateOfBirth).format("MMMM Do YYYY, h:mm:ss a"),
                  }
            }
          );



        } else {
          // Create new patient document
          const newPatient = new Patient({
            user:userId,
            image: files.file.newFilename,
            age: fields.age,
            mobile: fields.mobile,
            gender: fields.gender,
            name: {
              first: fields['name.first'],
              last: fields['name.last']
            },
            dateOfBirth:moment(fields.dateOfBirth).format("MMMM Do YYYY, h:mm:ss a"),
            address: {
              street: fields['address.street'],
              city: fields['address.city'],
              state: fields['address.state'],
              zip: fields['address.zip']
            }
          });
          await newPatient.save();
        }

        // if(Patientdoc){
        //   console.log('update')
        // }
        // else{
        //   console.log('insert');
        // }
   
        
        // Add code here to save the uploaded file or any other data to the database
        res.send("Successful");
      } catch (error) {
        console.log(error);
        res.status(500).send("Error connecting to the database.");
      } finally {
        await db.disconnect();
      }
    });
  } 





}
