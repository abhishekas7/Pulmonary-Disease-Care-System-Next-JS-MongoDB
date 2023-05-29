import { Schema, mongoose } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    text: true, 
  },
  description: {
    type: String,
    text: true, 
  },
  price: {
    type: Number,
  },
  manufacturer: {
    type: String,
  },
  prescription_required: {
    type: Boolean,
    default: false,
  },
  rating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
  image: {
    type: String,
  },
  quantity: {
    type: Number,
    min: 0,
    required: true
  },
  category: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
