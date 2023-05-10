import db from "@/util/db";
import { getError } from "@/util/error";
import { MyAddress } from "@/models/CheckoutSchema";

db.connect();

export default async function handler(req, res) {
  const { method } = req;
 

  switch (method) {
    case "DELETE":
        const { id } = req.query;
    
    
        try {
          const address = await MyAddress.findById(id);
          console.log(address);
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
        
        const address = await MyAddress.findById(id);

        if (address) {
         
              try {
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
