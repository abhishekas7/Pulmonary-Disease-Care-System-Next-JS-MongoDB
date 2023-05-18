import { Schema, mongoose } from 'mongoose';
const timeSlotSchema = new Schema({
  day: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

const doctorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  specialty: {
    type: String,
  },
  description: {
    type: String,
  },
  experience: {
    type: Number,
  },
  qualification: {
    type: String,
  },
  status: {
    type: Boolean,
    default:true
  },
  image:{
    type:String,
  },
  appointments: [{
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
  }],
  availability: [timeSlotSchema],
});

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
const TimeSlot = mongoose.models.TimeSlot || mongoose.model('TimeSlot', timeSlotSchema);

export default Doctor;
export {TimeSlot };

