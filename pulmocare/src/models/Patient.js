import { Schema, mongoose } from 'mongoose';
const patientSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',

    },
    age: {
      type: Number,

    },
    pincode: {
      type: String,

    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],

    },
     status: {
      type: Boolean,
      default: true
    },
  });

const Patient = mongoose.models.Patient || mongoose.model("Patient", patientSchema);
export default Patient;