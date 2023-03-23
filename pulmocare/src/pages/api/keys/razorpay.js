import  Razorpay from 'razorpay';
import shortid from 'shortid';
import { getError } from '@/util/error';

// const Razorpay = require("razorpay");
// const shortid = require("shortid");

export default async function handler(req, res) {
  if (req.method === "PUT") {
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });
console.log(req.body.amount)
console.log(process.env.RAZORPAY_SECRET)
    // Create an order -> generate the OrderID -> Send it to the Front-end
    // Also, check the amount and currency on the backend (Security measure)
    const payment_capture = 1;
    const amount = req.body.amount;
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.status(200).send({
        id: response.id,
        currency: response.currency,
        amount: response.amount,message:'Id fetched Successfullly'
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({message:getError(err),status:false});
    }
  } else {
    // Handle any other HTTP method
  }
}
