import Sasi from '../model/SasiModel.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import passport from "passport";
import express from 'express'
const router = express.Router()



export const SasiHandler= asyncHandler(async(req,res) =>{
    const { name, age } = req.body;
    const newData = new Sasi({
      name,
    age
    });
    newData.save((err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error saving data');
      } else {
        res.status(200).send('Data saved');
      }
    });
})


export const GetSasi= asyncHandler(async(req,res) =>{
    Sasi.find({}, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error retrieving data');
        } else {
          res.status(200).send(data);
        }
      });
})

export const SingleValue= asyncHandler(async(req,res) =>{
    const { das } = req.params;
    Sasi.findById(das, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error retrieving data');
      } else {
        res.status(200).send(data);
      }
    });
})

