import { Schema, mongoose } from 'mongoose';
const doctorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  specialty: {
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
  }]
});
const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
export default Doctor;

