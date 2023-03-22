import { Schema, mongoose } from 'mongoose';
const patientSchema = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true
    },
     status: {
      type: Boolean,
      default: true
    },
  });

const Patient = mongoose.models.Patient || mongoose.model("Patient", patientSchema);
export default Patient;