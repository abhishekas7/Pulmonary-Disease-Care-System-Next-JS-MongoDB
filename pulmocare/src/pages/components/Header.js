/* eslint-disable no-unused-vars */
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Store } from '@/util/Store'
import { useContext } from 'react'
import Image from '../../../public/img/logo.png'
import axios from 'axios'


const Header = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetchCart();
  }, []);
  const fetchCart = async () => {
    const response = await axios.get("/api/cart/getCartitems");
    setCart(response.data);
  };

  const sess=useSession()
  const logout=()=>{
       signOut({callbackUrl:'/login'})
  }

  let cartItemsLength = 0;
  if (cart && cart.cartItems && cart.cartItems.length > 0 && cart.cartItems[0].products) {
    cartItemsLength = cart.cartItems[0].products.length;
  }


  return (
    <div>

      {/* new navbar */}



      <header className="ltn__header-area ltn__header-3">
        <div className="ltn__header-middle-area">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="site-logo">
                  <Link href="index">
                    <img src="img/logo.png" alt="Logo" />
                  </Link>
                </div>
              </div>
              <div className="col header-contact-serarch-column d-none d-lg-block">
                <div className="header-contact-search">
                  {/* header-feature-item */}
                  <div className="header-feature-item">
                    <div className="header-feature-icon">
                      <i className="icon-call" />
                    </div>
                    <div className="header-feature-info">
                      <h6>Phone</h6>
                      <p>
                        <Link href="tel:0123456789">+0123-456-789</Link>
                      </p>
                    </div>
                  </div>
                  {/* header-search-2 */}
                  <div className="header-search-2">
                    <form id="#123" method="get" action="#">
                      <input
                  type="text"
                  name="search"
                  defaultValue=""
                  placeholder="Search here..."
                />
                      <button type="submit">
                        <span>
                          <i className="icon-search" />
                        </span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col">
                {/* header-options */}
                <div className="ltn__header-options">
                  <ul>

                    <li className="d-none">
                      {/* ltn__currency-menu */}
                      <div className="ltn__drop-menu ltn__currency-menu">
                        <ul>
                          <li>
                            <Link href="#" className="dropdown-toggle">
                              <span className="active-currency">USD</span>
                            </Link>
                            <ul>
                              <li>
                                <Link href="login">USD - US Dollar</Link>
                              </li>
                              <li>
                                <Link href="wishlist">CAD - Canada Dollar</Link>
                              </li>
                              <li>
                                <Link href="register">EUR - Euro</Link>
                              </li>
                              <li>
                                <Link href="account">GBP - British Pound</Link>
                              </li>
                              <li>
                                <Link href="wishlist">INR - Indian Rupee</Link>
                              </li>
                              <li>
                                <Link href="wishlist">BDT - Bangladesh Taka</Link>
                              </li>
                              <li>
                                <Link href="wishlist">JPY - Japan Yen</Link>
                              </li>
                              <li>
                                <Link href="wishlist">AUD - Australian Dollar</Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="d-lg-none">
                      {/* header-search-1 */}
                      <div className="header-search-wrap">
                        <div className="header-search-1">
                          <div className="search-icon">
                            <i className="icon-search  for-search-show" />
                            <i className="icon-cancel  for-search-close" />
                          </div>
                        </div>
                        <div className="header-search-1-form">
                          <form id="#" method="get" action="#">
                            <input
                        type="text"
                        name="search"
                        defaultValue=""
                        placeholder="Search here..."
                      />
                      
                            <button type="submit">
                              <span>
                                <i className="icon-search" />
                              </span>
                            </button>
                          </form>
                        </div>
                      </div>
                    </li>
                    <li className="d-none---">
                      {/* user-menu */}
                      <div className="ltn__drop-menu user-menu">
                        <ul>
                          <li>
                          </li>
                          <li>
                            <Link href="#">
                              <i className="icon-user" />
                            </Link>
                      
                            <ul>
                              <li>
                         
                                {sess.status==='authenticated'?(<button className='bg-light' onClick={logout}>Logout</button>):(<Link href="/login">Sign in</Link>)}
                              </li>
             
                        
                     
                              <li>
                                {!sess.status==='loading'?(<div>{sess.data.user.role==='admin'?(<Link href="/admindash">Admindash</Link>):(<div>{sess.data.user.role==='admin'?(<Link href="/admindash">Admindash</Link>):(null)}</div>)}</div>):(null)}
                              </li>
                              <li>
                                <Link href="/patientdash">My Account</Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      {/* mini-cart 2 */}
                      <div className="mini-cart-icon mini-cart-icon-2">
                        <Link
                    href="#ltn__utilize-cart-menu"
                    className="ltn__utilize-toggle"
                  >
                          <span className="mini-cart-icon">
                            <i className="icon-shopping-cart" />


                            <sup>{
                           
                           cartItemsLength
                           
                           }</sup>
                      
                          </span>
                          <h6>
                            <Link href="/cart/Cartscreen">
                              <span>Your Carts</span>{" "}
                            </Link>
                            {/* <span className="ltn__secondary-color">$89.25</span> */}
                          </h6>
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="sticky-top header-bottom-area ltn__border-top ltn__header-sticky ltn__sticky-bg-white--- ltn__sticky-bg-secondary ltn__secondary-bg section-bg-1 menu-color-white d-block d-lg-block">
          <div className="container">
            <div className="row sticky-top">
              <div className="col header-menu-column justify-content-center">
                <div className="sticky-logo">
                  <div className="site-logo">
                    <Link href="index">
                      <img src="img/logo-3.png" alt="Logo" />
                    </Link>
                  </div>
                </div>
                <div className="header-menu header-menu-2">
                  <nav>
                    <div className="ltn__main-menu">
                      <ul>
                        <li>
                          <Link href="/ ">Home</Link>
                        </li>
                        <li>
                          <Link href="/productpage">Products</Link>
                        </li>
                        <li>
                          <Link href="/doctorlist">Doctors</Link>
                        </li>
                        <li>
                          <Link href="http://localhost:3001/">Meditation</Link>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* header-bottom-area end */}
      </header>
    </div>
  )
}

export default Header