
import dotenv from 'dotenv'
import cors from 'cors'
import Routes from '../server/routes/routes.js'
import bodyParser from "body-parser";
import './database/db.js'
const port = process.env.PORT || 8000

import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express();

app.use(express.json())
app.use(express.urlencoded({  extended: false}))
app.use(cors({origin: true, credentials: true}));




// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(bodyParser.json());

app.use(session({
  secret: 'sdsdadadfadfdfsdf',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/PulmocareDB',
    autoReconnect: true,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));




app.use('/', Routes);
app.listen(port,() => console.log(`Server Running on port ${port}`))