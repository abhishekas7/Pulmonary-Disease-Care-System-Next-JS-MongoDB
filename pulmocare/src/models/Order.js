import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
  
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    cart: {
      type: Schema.Types.ObjectId,
      ref: 'CartSchema',
      required: true
    },
    shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    paymentMethod: { type: String },
    paymentResult: { id: String, status: String, email_address: String },
    itemsPrice: { type: Number },
    shippingPrice: { type: Number },
    taxPrice: { type: Number },
    totalPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
