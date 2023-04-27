import mongoose from 'mongoose';
const ShippingSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    address: {type: String,required: true},
    city: {type: String,required: true},
    country: {type: String,required: true},
    zip: {type: String,required: true},
    status: {type: String,required: true}
  });
const Address = mongoose.models.Address || mongoose.model("Address", ShippingSchema);
export default Address;