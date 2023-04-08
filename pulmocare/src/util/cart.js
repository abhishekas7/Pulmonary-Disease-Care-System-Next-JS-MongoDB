import axios from 'axios';

export const removeFromCart = async (cartItemId, productId) => {
  try {
    console.log(cartItemId,productId);
        const res = await axios.delete(`/api/cart/removeItem`);
        return res.data;
    } catch (err) {
        console.error(err);
    }
};