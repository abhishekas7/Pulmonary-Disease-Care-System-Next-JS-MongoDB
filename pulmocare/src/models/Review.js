import mongoose from 'mongoose';
const RatingSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    product: {type: mongoose.Schema.Types.ObjectId,ref: 'Product'},
    rating: {type: Number,default:0},
    review: [{type: String}],
    status: {type: String,required: true}
  });
const Rating = mongoose.models.Rating || mongoose.model("Rating", RatingSchema);
export default Rating;