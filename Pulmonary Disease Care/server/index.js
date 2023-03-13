

import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors'
// import passport, { use } from 'passport';
import session from 'express-session';
import bodyParser from "body-parser";
import Routes from '../server/routes/routes.js'
import './database/db.js'
import dotenv from "dotenv";
// import './util/passport.js'
// import './config/passport.js'
import cookieParser from 'cookie-parser'
import flash from 'connect-flash'
// import User from './model/UserModel.js'; 
import Users from './model/UserModel.js';
import bcrypt from 'bcrypt'
import MongoStore from 'connect-mongo';
import LocalStrategy from 'passport-local';
import User from './model/UserModel.js';
import connectMongoDBSession from 'connect-mongodb-session';
const MongoDBStore = connectMongoDBSession(session);
import path from 'path';


// Create a new session store
// const store = new MongoDBStore({
//   uri: 'mongodb://localhost:27017/PulmocareDB',
//   collection: 'sessions'
// });


const app = express();
const port = process.env.PORT || 8000


//configure env
dotenv.config();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Initialize the connect-flash middleware
app.use(flash());

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(bodyParser.json());


app.use('/', Routes);
// app.get('/dashboard', requireLogin, (req, res) => {
//   res.render('dashboard', { user: req.session.user });
// });
app.listen(port, function(error){
  if(error) throw error
  console.log("Server created Successfully on port :", port)
})

// --------------------------------------------------------------
