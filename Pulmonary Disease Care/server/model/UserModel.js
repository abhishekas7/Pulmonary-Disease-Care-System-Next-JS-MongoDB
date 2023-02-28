import mongoose from "mongoose";
import autoIncrement from 'mongoose-auto-increment'

const userSchema = new mongoose.Schema({
  usertype: String,
  name: String,
  email: String,
  password:String,
  confirmpassword: String
})
autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin,'user');

const User = mongoose.model('tb_user',userSchema);
export default User;
