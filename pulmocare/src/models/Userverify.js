import { Schema, mongoose } from "mongoose";

const OtpSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Otp = mongoose.models.Otp || mongoose.model("Otp", OtpSchema);
export default Otp;
