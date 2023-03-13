import { Schema, model } from 'mongoose';

const doctorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  appointments: [{
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
  }]
});

const Doctor = model('Doctor', doctorSchema);

export default Doctor;
