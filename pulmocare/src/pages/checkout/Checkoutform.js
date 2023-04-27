import { useState } from 'react';
import axios from 'axios';

const CheckoutForm = () => {
  const [user, setUser] = useState('');
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [shippingAddresses, setShippingAddresses] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new checkout document in the database
    try {
      const res = await axios.post('/api/checkout', {
        user,
        items,
        total,
        shippingAddresses,
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* User field */}
      <div className="form-group">
        <label htmlFor="user">User</label>
        <input
          type="text"
          className="form-control"
          id="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
      </div>

      {/* Items field */}
      <div className="form-group">
        <label htmlFor="items">Items</label>
        <input
          type="text"
          className="form-control"
          id="items"
          value={items}
          onChange={(e) => setItems(e.target.value)}
          required
        />
      </div>

      {/* Total field */}
      <div className="form-group">
        <label htmlFor="total">Total</label>
        <input
          type="number"
          className="form-control"
          id="total"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          required
        />
      </div>

      {/* Shipping addresses field */}
      <div className="form-group">
        <label htmlFor="shippingAddresses">Shipping Addresses</label>
        <input
          type="text"
          className="form-control"
          id="shippingAddresses"
          value={shippingAddresses}
          onChange={(e) => setShippingAddresses(e.target.value)}
          required
        />
      </div>

      {/* Submit button */}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default CheckoutForm;
