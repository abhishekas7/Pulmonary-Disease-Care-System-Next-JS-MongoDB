import mongoose from "mongoose";
import autoIncrement from 'mongoose-auto-increment'
import { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
  },
  age: {
    type: String,
  }
 
});

const Sasi = mongoose.model('sasi',userSchema);
export default Sasi;
