import db from '@/util/db';
// import Product from 'models/Product';
import Address from '@/models/Address';
import { getError } from '@/util/error';
import { getToken } from 'next-auth/jwt';
// import Address from '../../models/Address';
// export const config = {
//     api: {
//         bodyParser: false
//     }
// }

export default async function Upload(req, res) {

  const session = await getToken({ req: req, secret: process.env.SECRET });

    if (!session) {
      return res.status(401).send({message:'Please login to continue',status:true});
    }
    const { user } = session;
    if (req.method === 'POST'){
        // console.log(user._id)
        try{
        db.connect()
        const address = new Address({
          address: req.body.address,
          city: req.body.city,
          user: user._id,
          zip: req.body.zip,
          country:req.body.country,
          status:true,
        });
        db.disconnect()
        // console.log(req.body)
        res.send({message:'Address added Successfully',status:true,data:address})
    }catch(e){
      res.send({message:getError(e),status:false})
    }
  }else if( req.method === 'GET'){
      try{
        db.connect()
       
        const address = await Address.find({user:user._id,status:true});
        db.disconnect()
        res.send({message:'Address added Successfully',status:true,data:address})
        }catch(e){
          res.send({message:getError(e),status:false})
        }

  }else if(req.method === 'PUT'){
    try{
        await db.connect();
        const address = await Address.findById(req.query.id);
        if (address) {
          address.address = req.body.address;
          address.city = req.body.city;
          address.zip = req.body.zip;
        //   user.email = req.body.email;
          address.country =req.body.country;
          await address.save();
          await db.disconnect();
          res.send({ message: 'Updated successfully' ,status:true});
        }else {
          await db.disconnect();
          res.status(404).send({ message: 'Address not found',status:false });
        }
      }catch(e){
        res.send({message:getError(e),status:false})
        }
    } else if(req.method === 'DELETE'){
      try{
        await db.connect();
        const address = await Address.findById(req.query.id);
        if (address) {
          address.status = false;
          await address.save();
          await db.disconnect();
          res.send({ message: 'Address deleted successfully' ,status:true});
        } else {
          await db.disconnect();
          res.status(404).send({ message: 'Address not found',status:false });
        }
      await db.disconnect();
    }catch(e){
        res.status(404).send({ message: 'Address deletion failed',status:false });
    }
    } else{
    res.send({message:'BAD REQUEST',status:false})
}
}

    // })