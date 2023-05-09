import { MyOrders } from "@/models/CheckoutSchema";
import { getError } from "@/util/error";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
      case 'GET':
        const sess = await getSession({ req });
        const Id = sess.user._id;
        try {
            const orders = await MyOrders.find({ user: Id }).populate('user shippingAddress').exec();
            // Return a JSON response with the orders data
            res.status(200).json({ data: orders, message: 'Orders fetched successfully' });
            
        } catch (error) {
            getError(error)
        }
        //next js mongodb code for get order details?
        break;
      case 'POST':
        // Code to create new data in your database or other data source
        res.status(201).json({ message: 'POST request handled' });
        break;
      case 'PUT':
        // Code to update existing data in your database or other data source
        res.status(200).json({ message: 'PUT request handled' });
        break;
      case 'DELETE':
        // Code to delete data from your database or other data source
        res.status(204).json({ message: 'DELETE request handled' });
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
  