import { Schema, model } from 'mongoose';

const prescriptionSchema = new Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true
    },
    dosage: {
      type: String,
      required: true
    },
    instructions: {
      type: String
    },
    warnings: {
      type: String
    }
  });
const Prescription = model('Prescription', prescriptionSchema);

export default Prescription;