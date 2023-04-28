import db from "@/util/db";
import { getError } from "@/util/error";
import { getSession } from "next-auth/react";
import { MyAddress } from "@/models/CheckoutSchema";

db.connect();

export default async function handler(req, res) {
  const { method } = req;
  const sess = await getSession({ req });
  const Id = sess.user._id;
 

  switch (method) {
    case "GET":
      try {
        await db.connect();
        const addresses = await MyAddress.find({ user: Id });

        res.status(200).json({ success: true, data: addresses });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }

      break;

    case "POST":
      try {
        await db.connect();
        const { address1, address2, city, state, zip } = req.body;

        // create a new address document
        const newAddress = new MyAddress({
          user: Id,
          address1: address1,
          address2: address2,
          city: city,
          state: state,
          zip: zip,
        });

        // save the new address document to the database
        const savedAddress = await newAddress.save();

        res.status(201).json({ success: true, data: savedAddress });
        await db.disconnect();
      } catch (error) {
        console.error(getError(error));
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        await db.connect();
        const { status, appId } = req.body;

        const appointment = await Appointment.findById(appId);

        if (appointment) {
          if (status === "confirmed") {
            try {
              const filter = { _id: appId };
              const update = { status: "confirmed" };
              const doc = await Appointment.findOneAndUpdate(filter, update, {
                new: "true",
              });
            } catch (error) {
              console.log(getError(error));
            }
          } else {
            try {
              const filter = { _id: appId };
              const update = { status: "cancelled" };
              await Appointment.findOneAndUpdate(filter, update, {
                new: "true",
              });
            } catch (error) {
              console.log(getError(error));
            }
          }
        }
        res.send("Successful");
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
        const { addid } = req.query;
       

        try {
          const address = await Address.findById(id);
      
          if (!address) {
            return res.status(404).json({ success: false, message: "Address not found" });
          }
      
          await address.remove();
      
          res.status(200).json({ success: true, message: "Address deleted" });
        } catch (error) {
          console.log(getError(error));
          res.status(500).json({ success: false, message: "Internal server error" });
        }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
