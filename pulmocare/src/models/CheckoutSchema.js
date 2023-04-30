const mongoose = require('mongoose');
const AddressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
});

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cartitems: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cart',
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MyAddress',
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MyAddress = mongoose.models.MyAddress || mongoose.model('MyAddress', AddressSchema);
const MyOrders = mongoose.models.MyOrders || mongoose.model('MyOrders', OrderSchema);

module.exports = { MyOrders, MyAddress };
