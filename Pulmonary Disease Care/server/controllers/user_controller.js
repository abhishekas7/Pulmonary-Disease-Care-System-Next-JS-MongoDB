
import User from "../model/UserModel.js";
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import passport from "passport";
import express from 'express'
const router = express.Router()
import session from 'express-session';
import {comparePassword, hashPassword} from '../helpers/authHelper.js'
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'


//--------------------USER REGISTER---------------------

export const RegUser = asyncHandler(async(req,res) =>{
  const { email,username ,password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create new user
  const newUser = new User({
    email,
    username,
    password: hashedPassword,
  });
  

  // Save user to database
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }


  // Patient.findOne({ email }).then(patient => {
  //   if (patient) return res.status(409).json({ msg: "Email already registered" });

  //   // else create new instance of patient for registration
  //   const newPatient = new Patient({
  //     name,
  //     email,
  //     password,
  //     age,
  //     gender,
  //     address,
  //     dob,
  //     phone,
  //     medical_records: [],
  //   });

  //   // create salt and hash
  //   bcrypt.genSalt(10, (err, salt) => {
  //     bcrypt.hash(newPatient.password, salt, (err, hash) => {
  //       if (err) return res.status(400).json({ msg: "Invalid data received" });

  //       newPatient.password = hash;

  //       // register the patient and return the data as response
  //       newPatient.save().then(patient => {
  //         jwt.sign({ id: patient.id }, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
  //           if (err) throw err;

  //           res.json({
  //             token,
  //             user: {
  //               id: patient.id,
  //               name: patient.name,
  //               email: patient.email,
  //               isStaff: false,
  //             },
  //           });
  //         });
  //       });
  //     });
  //   });
  // });

})

//-----------------ADMIN REGISTER-------------------------
export const Regadmin = asyncHandler(async(req,res) =>{
    try{
        // Hash password
        
        const hashedPassword = await hashPassword(password);
        // Create user
        const newUser = new User({
          email: 'admin@123',
          username: 'admin',
          password: hashedPassword,
          role:'admin'
        });
            // Save user to database
    await newUser.save();
    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      newUser,
    });
    
    res.status(201).json({ message: 'User registered successfully!' });
    }
    catch(error){
        res.status(209).json({message:error.message});
    }

})

// -----------------USER LOGIN-------------------------
export const Oathuser = async (req, res) => {
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export const Logoutuser= asyncHandler(async(req,res) =>{
res.send('s')
})

export const GetLogin= asyncHandler(async(req,res) =>{
try {

} catch (error) {
  res.status(500).send('Error');
}
})


// --------------------------------------------TEST-------------------------------------
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};













