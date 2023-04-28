import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartSchema = new Schema({
  
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    products: [
      {
        productId: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        name: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true,
          min: 0
        },
        image: {
          type: String,
          required: true
        }
      }
    ],
    active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

cartSchema.virtual('cartSubtotal').get(function() {
  return this.products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
});

const cart = mongoose.models.cart || mongoose.model('cart', cartSchema);
export default cart;
