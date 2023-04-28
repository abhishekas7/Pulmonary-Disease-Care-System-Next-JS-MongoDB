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
    case "DELETE":
        const { id } = req.query;
        console.log(id);
    
        try {
          const address = await MyAddress.findById(id);
          console.log(address);
          const result = await MyAddress.deleteOne({ _id: id });
          res.status(200).json({ success: true, message: "Address deleted" });
        } catch (error) {
          console.log(getError(error));
          res.status(500).json({ success: false, message: "Internal server error" });
        }
      break;
      case "PUT":
      try {
        await db.connect();
        const { id } = req.query;
        const {address1,address2,city,state,zip} =req.body
        
        const address = await MyAddress.findById(id);

        if (address) {
         
              try {
                const filter = { _id: id };
                const update = { address1: address1,address2:address2,city:city,state:state,zip:zip };
                const newaddress = await MyAddress.findOneAndUpdate(filter, update, {
                  new: "true",
                });
              } 
              
              catch (error) {
                console.log(getError(error));
              }
        
            }


        res.send("Successful");
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
