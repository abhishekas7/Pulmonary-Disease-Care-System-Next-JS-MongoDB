import Link from 'next/link'
import Script from 'next/script'
import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Store } from '@/util/Store'
import { useContext } from 'react'


const Header = () => {

    
  const { state, dispatch } = useContext(Store);

  const {cart} = state;


  const sess=useSession()
  const logout=()=>{
       signOut({callbackUrl:'/login'})

  }
  return (
    <div>
    <header className="ltn__header-area ltn__header-3">
  {/* ltn__header-top-area start */}
  <div className="ltn__header-top-area border-bottom">
    <div className="container">
      <div className="row">
        <div className="col-md-7">
          <div className="ltn__top-bar-menu">
            <ul>
              <li>
                <Link href="mailto:info@webmail.com?Subject=Flower%20greetings%20to%20you">
                  <i className="icon-mail" /> info@webmail.com
                </Link>
              </li>
              <li>
                <Link href="locations">
                  <i className="icon-placeholder" /> 15/A, Nest Tower, NYC
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-5">
          <div className="top-bar-right text-right text-end">
            <div className="ltn__top-bar-menu">
              <ul>
                <li>
                  {/* ltn__language-menu */}
                  <div className="ltn__drop-menu ltn__currency-menu ltn__language-menu">
              
                  </div>
                </li>
                <li>
                  {/* ltn__social-media */}
                  <div className="ltn__social-media">
                    <ul>
                      <li>
                        <Link href="#" title="Facebook">
                          <i className="fab fa-facebook-f" />
                        </Link>
                      </li>
                      <li>
                        <Link href="#" title="Twitter">
                          <i className="fab fa-twitter" />
                        </Link>
                      </li>
                      <li>
                        <Link href="#" title="Instagram">
                          <i className="fab fa-instagram" />
                        </Link>
                      </li>
                      <li>
                        <Link href="#" title="Dribbble">
                          <i className="fab fa-dribbble" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* ltn__header-top-area end */}
  {/* ltn__header-middle-area start */}
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
                          <Link href="/register">Register</Link>
                        </li>
                        <li>
                          {!sess.status==='loading'?(<div>{sess.data.user.role==='admin'?(<Link href="/admindash">Admindash</Link>):(<div>{sess.data.user.role==='admin'?(<Link href="/admindash">Admindash</Link>):(null)}</div>)}</div>):(null)}
                        </li>
                        <li>
                          <Link href="/Patientprofile">My Account</Link>
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
                      <sup>{state.cart.cartItems.length}</sup>
                    </span>
                    <h6>
                      <span>Your Cart</span>{" "}
                      <span className="ltn__secondary-color">$89.25</span>
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
  {/* ltn__header-middle-area end */}
  {/* header-bottom-area start */}
  <div className="header-bottom-area ltn__border-top ltn__header-sticky ltn__sticky-bg-white--- ltn__sticky-bg-secondary ltn__secondary-bg section-bg-1 menu-color-white d-none d-lg-block">
    <div className="container">
      <div className="row">
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
                  {/* <li className="menu-icon">
                    <Link href="#">Home</Link>
                    <ul className="sub-menu menu-pages-img-show ltn__sub-menu-col-2---">
                      <li>
                        <Link href="index">Home Style 01</Link>
                        <img src="img/home-demos/home-1.jpg" alt="#" />
                      </li>
                      <li>
                        <Link href="index-2">Home Style 02</Link>
                        <img src="img/home-demos/home-2.jpg" alt="#" />
                      </li>
                      <li>
                        <Link href="index-3">Home Style 03</Link>
                        <img src="img/home-demos/home-3.jpg" alt="#" />
                      </li>
                    </ul>
                  </li> */}

                  {/* <li className="menu-icon mega-menu-parent">
                    <Link href="#">Pages</Link>
                    <ul className="mega-menu column-4">
                      <li>
                        <Link href="#">Inner Pages</Link>
                        <ul>
                          <li>
                            <Link href="portfolio">Gallery</Link>
                          </li>
                          <li>
                            <Link href="portfolio-2">Gallery - 02</Link>
                          </li>
                          <li>
                            <Link href="portfolio-details">Gallery Details</Link>
                          </li>
                          <li>
                            <Link href="team">Team</Link>
                          </li>
                          <li>
                            <Link href="team-details">Team Details</Link>
                          </li>
                          <li>
                            <Link href="faq">FAQ</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link href="#">Inner Pages</Link>
                        <ul>
                          <li>
                            <Link href="history">History</Link>
                          </li>
                          <li>
                            <Link href="contact">Appointment</Link>
                          </li>
                          <li>
                            <Link href="locations">Google Map Locations</Link>
                          </li>
                          <li>
                            <Link href="404">404</Link>
                          </li>
                          <li>
                            <Link href="contact">Contact</Link>
                          </li>
                          <li>
                            <Link href="coming-soon">Coming Soon</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link href="#">Shop Pages</Link>
                        <ul>
                          <li>
                            <Link href="shop">Shop</Link>
                          </li>
                          <li>
                            <Link href="shop-left-sidebar">
                              Shop Left sidebar
                            </Link>
                          </li>
                          <li>
                            <Link href="shop-right-sidebar">
                              Shop right sidebar
                            </Link>
                          </li>
                          <li>
                            <Link href="shop-grid">Shop Grid</Link>
                          </li>
                          <li>
                            <Link href="product-details">Shop details </Link>
                          </li>
                          <li>
                            <Link href="cart">Cart</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link href="shop">
                          <img src="img/banner/menu-banner-1.png" alt="#" />
                        </Link>
                      </li>
                    </ul>
                  </li> */}
                  <li>
                    <Link href="/ ">Home</Link>
                  </li>
                  <li>
                    <Link href="/productpage">Products</Link>
                  </li>
                  <li>
                    <Link href="/Doctorlist">Doctors</Link>
                  </li>
                  <li>
                    <Link href="/news">News</Link>
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


  <Script src="https://example.com/script.js" />
<Script src="js/plugins.js"></Script>

    </div>
  )
}

export default Header