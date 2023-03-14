import Link from 'next/link'
import React from 'react'
import Footer from './Footer'
import Header from './Header'
import { Store } from '@/util/Store'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useContext } from 'react'
import { useEffect } from 'react'

import axios from 'axios'



const Addtocart = () => {
  const [count, setCount] = useState(false);
  const sess=useSession();
  const router = useRouter();
  const [qty,setqty]=useState('');
  const { state, dispatch } = useContext(Store);
  const {cart: { cartItems },} = state;
  const removeItemHandler = async(item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const loading=()=>{
      <Loader/>
    }
    const { data } = await axios.get(`/api/product/${item._id}`);
    if ( item.quantity < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    toast.success('Product updated in the cart');
  };



  useEffect(() => {
    setCount(true);
    setTimeout(() => {
      setCount(false);
    }, 3000);

    // console.log(cart);
    // console.log(auth.currentUse}r.uid);
    if (sess.status=='unauthorized') {
      return router.push('/auth/login');
    }
   
    



    // fetchUserName();
  }, []);
  return (
    <div>
<Header/>
<div className="liton__shoping-cart-area mb-120">
  <div className="container">
    <div className="row">
      {/* {cartItems.length} */}
      
       
    
      <div className="col-lg-12">
        <div className="shoping-cart-inner">
          <div className="shoping-cart-table table-responsive">
            <table className="table">
 
              <tbody>
                <tr>
                  <td>s</td>
                  <td>s</td>
                  <td>s</td>
                  <td>s</td>
              
                </tr>
              {cartItems.map((item,i)=>(
                <div key={i}>

              
                <tr >
                  <td className="cart-product-remove"><button type='button' onClick={()=>removeItemHandler(item)}>x</button></td>
                  <td className="cart-product-image">
                    <a href="product-details.html">
                      <img src={`/images/${item.image}`} alt="#" />
                    </a>
                  </td>
                  <td className="cart-product-info">
                    <h4>
                      <a href="product-details.html">{item.name}</a>
                    </h4>
                  </td>
                  <td className="cart-product-price">{item.price}</td>
        
                  <td className="cart-product-price">
                  <td>

                  <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                      
                        {[...Array(item.quantity).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                          
                        ))}
                       
                        

                      </select>
           
</td>
                  </td>
                  {/* <td class="cart-product-quantity">
                                            <div class="cart-plus-minus"><div class="dec qtybutton">-</div>
                                                <input type="text" value="02" name="qtybutton" class="cart-plus-minus-box"/>
                                            <div class="inc qtybutton">+</div></div>
                                        </td> */}
                  <td className="cart-product-subtotal">{item.quantity * item.price}</td>
                </tr>

                {/* <tr className="cart-coupon-row">
                  <td colSpan={6}>
                    <div className="cart-coupon">
                      <input
                        type="text"
                        name="cart-coupon"
                        placeholder="Coupon code"
                      />
                      <button
                        type="submit"
                        className="btn theme-btn-2 btn-effect-2"
                      >
                        Apply Coupon
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      type="submit"
                      className="btn theme-btn-2 btn-effect-2-- disabled"
                    >
                      Update Cart
                    </button>
                  </td>
                </tr> */}
                  </div>))}
              </tbody>
            </table>
          </div>
          <div className="shoping-cart-total mt-50">
            <h4>Cart Totals</h4>
            <table className="table">
              <tbody>
                <tr>
                  <td>Cart Subtotal</td>
                  <td>$618.00</td>
                </tr>
                <tr>
                  <td>Shipping and Handing</td>
                  <td>$15.00</td>
                </tr>
                <tr>
                  <td>Vat</td>
                  <td>$00.00</td>
                </tr>
                <tr>
                  <td>
                    <strong>Order Total</strong>
                  </td>
                  <td>
                    <strong>$633.00</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="btn-wrapper text-right">
              <Link href="Checkout" className="theme-btn-1 btn btn-effect-1">
                Proceed to checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<Footer/>
    </div>
  )
}

export default Addtocart


// export async function getServerSideProps() {
//   await db.connect();
//   const products = await Product.find().lean();
//   console.log(products);
//   return {
//     props: {
//       products: products.map(db.convertDocToObj),
//     },
//   };
// }
