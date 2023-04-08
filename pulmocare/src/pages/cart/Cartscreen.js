import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import { getSession } from "next-auth/react";

import db from "@/util/db";
import { useSession } from "next-auth/react";
import CartSchema from "@/models/CartSchema";
import Navbar1 from "../components/Navbar1";
import Navbar from "../components/Navbar";
import axios from "axios";
import { removeFromCart } from "@/util/cart";

function CartScreen({ cartItem }) {
  const session = useSession();

  // alert(session.data.user._id);
  const [Carts, setCarts] = useState([cartItem]);

  useEffect(() => {
    console.log(Carts);
  }, []);



const [cart, setCart] = useState(cartItem);





const decrementQuantity = (cartItemId, productId) => {
  const updatedCart = cart.map((cartItem) => {
    if (cartItem._id !== cartItemId) return cartItem;
    const updatedProducts = cartItem.products.map((product) => {
      if (product._id === productId && product.quantity > 1) {
        product.quantity--;
        cartItem.totalPrice -= product.price;
      }
      return product;
    });
    return { ...cartItem, products: updatedProducts };
  });
  setCart(updatedCart);
};

const incrementQuantity = (cartItemId, productId) => {
  const updatedCart = cart.map((cartItem) => {
    if (cartItem._id !== cartItemId) return cartItem;
    const updatedProducts = cartItem.products.map((product) => {
      if (product._id === productId) {
        if (product.quantity === 0) {
          alert('Out of stock');
          return product;
        }
        product.quantity++;
        cartItem.totalPrice += product.price;
      }
      return product;
    });
    return { ...cartItem, products: updatedProducts };
  });
  setCart(updatedCart);
};

const removeItemFromCart = async (cartId,itemId) => {
  try {
   
    const response = await axios.delete('/api/cart/removeItem', {
      data: { cartId,itemId },
    });
    if (response.status === 200) {
      const updatedCartItems = cartItem.filter((item) => item._id !== itemId);
      setCart(updatedCartItems);
    }
  } catch (error) {
    console.error(error);
  }
};




    // Calculate cart subtotal
    const cartSubtotal = cartItem.reduce((total, cart) => {
      const itemTotal = cart.products.reduce((subtotal, item) => {
        return subtotal + (item.price * item.quantity);
      }, 0);
      return total + itemTotal;
    }, 0);
  
    // Calculate order total (for now just same as cart subtotal)
    const orderTotal = cartSubtotal;


  return (
    <div>
      <Navbar1 />
      <Navbar />
      <div className="mycrt">
        <div className="liton__shoping-cart-area mb-120">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="shoping-cart-inner mt-5">
                  <div className="shoping-cart-table table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="text-center">Image</th>
                          <th className="text-center">Name</th>
                          <th className="text-center">Price</th>
                          <th className="text-center">Quantity</th>
                          <th className="text-center">Total</th>
                        </tr>
                      </thead>
                      {cartItem.map((cart) => (
                        <tbody>
                          {cart.products.map((item) => (
                            <tr>


                              <td  className="cart-product-remove"><button onClick={() => removeItemFromCart(cart._id,item._id)}>Remove</button></td>
                              <td className="cart-product-image">
                                <a href="product-details.html">
                                  <img
                                    src={`..//images/${item.image}`}
                                    className="img-fluid img-thumbnail"
                                    width={"150px"}
                                  />
                                </a>
                              </td>
                              <td className="cart-product-info">
                                <h4>
                                  <a href="#" className="">
                                    {item.name}
                                  </a>
                                </h4>
                              </td>
                              <td className="cart-product-price">
                                {item.price}
                              </td>

                              <td>
                              <div className="cart-plus-minus">
  <div
    className="dec qtybutton"
    onClick={() => decrementQuantity(cart._id, item._id)}
  >
    -
  </div>
  <input
    type="text"
    value={item.quantity}
    name="qtybutton"
    className="cart-plus-minus-box"
  />

  <div
    className="inc qtybutton"
    onClick={() => incrementQuantity(cart._id, item._id)}
  >
    +
  </div>
</div>
          </td>
                              <td className="cart-product-price">
                                {item.price * item.quantity}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      ))}
                    </table>
                  </div>
                  <div className="shoping-cart-total mt-50">
                    <h4>Cart Totals</h4>
                    <table className="table">
  <tbody>
    <tr>
      <td>Cart Subtotal</td>
      <td>&#x20B9;{cartSubtotal.toFixed(2)}</td>
    </tr>

    <tr>
      <td>
        <strong>Order Total</strong>
      </td>
      <td>
        <strong>&#x20B9;{orderTotal.toFixed(2)}</strong>
      </td>
    </tr>
  </tbody>
</table>

                    <div className="btn-wrapper text-right">
                      <a
                        href="checkout.html"
                        className="theme-btn-1 btn btn-effect-1"
                      >
                        Proceed to checkout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CartScreen;

export async function getServerSideProps(context) {
  db.connect();
  const session = await getSession(context);

  const user_id = session.user._id;

  // const cartItem = await CartSchema.find({ userId: user_id }).populate('products');
  const cartItem = await CartSchema.find()
    .populate("products.productId")
    .exec();


  return {
    props: {
      cartItem: JSON.parse(JSON.stringify(cartItem)),
    },
  };
}
