import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import Routes from '../server/routes/routes.js'
import bodyParser from "body-parser";


import './database/db.js'

const port = process.env.PORT || 8000

const app = express()

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

// app.use("/", router);
app.use('/', Routes);

app.listen(port,() => console.log(`Server Running on port ${port}`))