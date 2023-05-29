import formidable from "formidable";
import { join, resolve } from "path";
import db from "@/util/db";
import Patient from "@/models/Patient";
import { getSession } from "next-auth/react";
import moment from "moment";
import User from "@/models/User";
import { getError } from "@/util/error";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function Upload(req, res) {
  const sess = await getSession({ req });
  const userId = sess.user._id;

  if (req.method === "GET") {
    try {
      const patients = await Patient.find({ user: userId }).populate("user");
      res.status(200).json(patients);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
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

      try {
        await db.connect();
        const user = await User.findById(userId);
        let patient = await Patient.findOne({ user: userId });

        if (patient) {
          // Update existing patient document
          patient.name.first = fields["name.first"];
          patient.name.last = fields["name.last"];
          patient.email = user.email;
          patient.age = fields.age;
          patient.image = files.file.newFilename;
          patient.mobile = fields.mobile;
          patient.gender = fields.gender;
          patient.dateOfBirth = moment(fields.dateOfBirth).format(
            "MMMM Do YYYY, h:mm:ss a"
          );

          await patient.save();
        } else {
          // Create new patient document
          patient = new Patient({
            user: userId,
            image: files.file.newFilename,
            age: fields.age,
            mobile: fields.mobile,
            gender: fields.gender,
            name: {
              first: fields["name.first"],
              last: fields["name.last"],
            },
            dateOfBirth: moment(fields.dateOfBirth).format(
              "MMMM Do YYYY, h:mm:ss a"
            ),
          });

          await patient.save();
        }

        res.status(200).json(patient);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      } finally {
        await db.disconnect();
      }
    });
  }
}
