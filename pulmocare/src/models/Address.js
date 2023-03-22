import { Schema, model } from 'mongoose';

const addressSchema = new Schema({
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  }
});

const Address = model('Address', addressSchema);

export default Address;
