import React, { useState } from 'react';
import axios from 'axios';
import Rating from 'react-rating';

function ProductRating({ productId }) {

    console.log(productId);
  const [rating, setRating] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Submit the rating to the API endpoint
      console.log(rating);
      const response = await axios.put('/api/product/rating', { productId, rating });

      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="rating-select">Rating</label><br></br>
      <Rating
  initialRating={rating}
  onChange={handleRatingChange}
  emptySymbol={<i className="far fa-star" style={{ color: '#c3c3c3' }}></i>}
  fullSymbol={<i className="fas fa-star" style={{ color: '#ffc107' }}></i>}
/>

      <button type="submit" className='btn btn-success'>Review</button>
    </form>
  );
}

export default ProductRating;
