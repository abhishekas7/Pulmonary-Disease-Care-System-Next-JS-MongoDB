import Product from "@/models/Product";
import db from "@/util/db";
import Rating from "@/models/Review";
import { getError } from "@/util/error";
import { getSession } from "next-auth/react";
const handler = async (req, res) => {
  
  const session = await getSession({ req });
  if(req.method==='PUT'){
  try{
    await db.connect();
    const product = await Rating.findOne({user:session.user._id,product:req.body.productId});
    const product1 = await Product.findById(req.body.productId);
    console.log(product1);
    if (product) {
      // console.log(product)
    
      product.rating=req.body.rating;
      // console.log(product)
      if(product1.rating===0){
        product1.rating=req.body.rating
        }else{
          product1.rating=(product1.rating+req.body.rating)/2
        }
      await product1.save()
      await product.save();
    //   await disconnect()
      res.send({ message: 'Thank you for updating your rating' ,status:true});
    } else {
      
      if(product1.rating===0){
      product1.rating=req.body.rating
      product1.numReviews=(product1.numReviews+1)
      }else{
        product1.rating=(product1.rating+req.body.rating)/2
      }
      await product1.save()
      // console.log(newrating)
      res.send({ message: 'Thank you for rating' ,status:true});
    }
  await db.disconnect();
  }catch(e){
    // console.log(getError(e))
    res.send({message:getError(e),status:false})
  }
}else if(req.method==='POST'){
    try{
      await db.connect();
      const product = await Rating.findOne({user:session.user._id,product:req.body.id});
      // console.log(product.rating)
      res.send({ rating: product.rating ,status:true});
       await db.disconnect();
    
    }catch(e){
      // console.log(getError(e))
      res.send({message:getError(e),status:false})
    }
  }
//   res.send(user.name);
};


export default handler;