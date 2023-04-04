import User from "@/models/User";
import { compare } from "bcrypt";
import { jwt } from "jsonwebtoken";

export default async function handler(req, res) {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
          return res.status(404).send({
            success: false,
            message: "Invalid email or password",
          });
        }
        //check user
        const user = await User.findOne({ email }).where('status').equals(true);
        console.log(user);
        if (!user) {
          return res.status(404).send({
            success: false,
            message: "Email is not registerd",
          });
        }
        const match = await compare(password,user.password)
        // const match = await comparePassword(password, user.password);
        if (!match) {
          return res.status(200).send({
            success: false,
            message: "Invalid Password",
          });
        }

        res.status(200).send({
          success: true,
          message: "login successfully",
          user: {
            _id: user._id,
            name: user.username,
            email: user.email,
            role: user.role,
          },
 
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error in login",
          error,
        });
      }
  
  
}