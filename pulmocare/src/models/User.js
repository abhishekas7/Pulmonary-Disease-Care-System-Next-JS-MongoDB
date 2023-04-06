import { Schema, mongoose } from 'mongoose';

const userSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      default: true
    },
    otp: {
      type: Number,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'doctor', 'patient'],
      default: 'patient'
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  });

  const User = mongoose.models.User || mongoose.model("User", userSchema);
  export default User;
