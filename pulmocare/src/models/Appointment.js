import { Schema, mongoose } from 'mongoose';

const appointmentSchema = new Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
 
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
  },
  date: {
    type: Date,

  },
  reason: {
    type: String,
  },
  phonenumber: {
    type: String, 
  },
  is_completed: {
    type: Boolean,
    default: false
  },
  status: {
    type: Boolean,
    default: true
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

const Appointment = mongoose.models.appointment || mongoose.model("appointment", appointmentSchema);
export default Appointment;

