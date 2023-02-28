import express from 'express';
import bcrypt from 'bcrypt'
import User from '../model/UserModel.js';

const Register = async (req, res, next) => {
  const { email, username, password } = req.body;

  try {
    // Check if user already exists
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = new User({
      email: email,
      username: username,
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

export default Register; 

