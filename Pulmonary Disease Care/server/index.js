import express from 'express';
import './database/db.js'
import dotenv from 'dotenv';
import Routes from './routes/routes.js';
import cors from 'cors';
import bodyParser from 'body-parser'; 

const app =express()

dotenv.config();

// app.use(bodyParser.json())
app.use(cors());

const PORT = 8000;


app.use('/',Routes)
app.use(bodyParser.json({ extended: true })); // for parsing 
app.use(bodyParser.urlencoded({ extended: true })); // for parsing 


app.listen(PORT,(req,res) => console.log(`Server is running on PORT ${PORT}`));