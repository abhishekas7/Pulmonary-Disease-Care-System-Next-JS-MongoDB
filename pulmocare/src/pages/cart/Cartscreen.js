import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import { getSession } from "next-auth/react";

import db from "@/util/db";
import { useSession } from "next-auth/react";
import CartSchema from "@/models/CartSchema";
import axios from "axios";
import Link from "next/link";
import Header from "../components/Header";


function CartScreen({ cartItem }) {
  const session = useSession();
const [cart, setCart] = useState(cartItem);



  // alert(session.data.user._id);
  const fetchCartData = async () => {
    try {
      const response = await axios.get("/api/cart/getCartitems");
      if (response.status === 200) {
        setCart(response.data.cartItems);
     
      }
      
    } catch (error) {
      console.error(error);
    }
  };
  // fetch cart data on mount
  // fetch cart data on mount
  useEffect(() => {
    fetchCartData();
  }, []);

const decrementQuantity = async (productId,cartItemId) => {
  try {
    console.log(productId);
     const response = await axios.put('/api/cart/decrement', {productId,cartItemId},
);
     
     
     if (response.status === 200) {
       fetchCartData();
       // console.log(cart);
       
       
     }
   } catch (error) {
     console.error(error);
   }

};


const incrementQuantity = async (productId,cartItemId) => {
  try {
   
     const response = await axios.put('/api/cart/increment', {productId,cartItemId},
);
     
     
     if (response.status === 200) {
       fetchCartData();
       // console.log(cart);
     }
   } catch (error) {
     console.error(error);
   }

};


const removeItemFromCart = async (cartId,itemId) => {
  try {
   console.log('hi');
    const response = await axios.delete('/api/cart/removeItem', {
      data: { cartId,itemId },
    });
    
    
    if (response.status === 200) {
      fetchCartData();
      // console.log(cart);
      
      
    }
  } catch (error) {
    console.error(error);
  }
};




const cartSubtotal = cart.reduce((total, item) => {
  return total + item.products.reduce((subtotal, product) => {
    return subtotal + product.price * product.quantity;
  }, 0);
}, 0);




  return (
    <div>
    
   <Header/>
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
                      {cart.length === 0 ? (
    <p>Your cart is empty</p>
) : (
    cart.map((item) => (
        <tbody>
            {item.products.map((items) => (
                <tr>
               
                    <td  className="cart-product-remove">
                        <button onClick={() => removeItemFromCart(item._id,items._id)}>x</button>
                    </td>
                    <td className="cart-product-image">
                        <a href="product-details.html">
                            <img
                                src={`..//images/${items.image}`}
                                className="img-fluid img-thumbnail"
                                width={"150px"}
                            />
                        </a>
                    </td>
                    <td className="cart-product-info">
                        <h4>
                            <a href="#" className="">
                                {items.name}
                            </a>
                        </h4>
                    </td>
                    <td className="cart-product-price">
                        {items.price}
                    </td>
                    <td>
                        <div className="cart-plus-minus">
                            <div
                                className="dec qtybutton"
                                onClick={() => decrementQuantity(items.productId, items._id)}
                            >
                                -
                            </div>
                            <input
                                type="text"
                                value={items.quantity}
                                name="qtybutton"
                                className="cart-plus-minus-box"
                            />
                            <div
                                className="inc qtybutton"
                                onClick={() => incrementQuantity(items.productId, items._id)}
                            >
                                +
                            </div>
                        </div>
                    </td>
                    <td className="cart-product-price">
                        {items.price * items.quantity}
                    </td>
                </tr>
            ))}
        </tbody>
    ))
)}

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

  <td>&#x20B9;{cartSubtotal.toFixed(2)}</td>
</tr>
  </tbody>
</table>

<div className="btn-wrapper btn-success text-right mt-1">
  <Link href="/Checkout" className="btn btn-success">
    Proceed to checkout
  </Link>
  <Link href="/Checkout2" className="btn btn-danger">
    Proceed to checkout
  </Link>
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

  const cartItem = await CartSchema.find({ userId: user_id }).populate('products');
  // const cartItem = await CartSchema.find()
  //   .populate("products.productId")
  //   .exec();
  return {
    props: {
      cartItem: JSON.parse(JSON.stringify(cartItem)),
    },
  };
}
