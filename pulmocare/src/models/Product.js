import { Schema, mongoose } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
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
    default: 0,
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
