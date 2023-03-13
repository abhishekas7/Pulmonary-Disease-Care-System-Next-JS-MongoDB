import React from 'react'

const Footer = () => {
  return (
    <div>
          <footer className="ltn__footer-area  ">
    <div className="footer-top-area  section-bg-1 plr--5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-3 col-md-6 col-sm-6 col-12">
            <div className="footer-widget footer-about-widget">
              <div className="footer-logo">
                <div className="site-logo">
                  <img src="img/logo.png" alt="Logo" />
                </div>
              </div>
              <p>
                Lorem Ipsum is simply dummy text of the and typesetting
                industry. Lorem Ipsum is dummy text of the printing.
              </p>
              <div className="footer-address">
                <ul>
                  <li>
                    <div className="footer-address-icon">
                      <i className="icon-placeholder" />
                    </div>
                    <div className="footer-address-info">
                      <p>Brooklyn, New York, United States</p>
                    </div>
                  </li>
                  <li>
                    <div className="footer-address-icon">
                      <i className="icon-call" />
                    </div>
                    <div className="footer-address-info">
                      <p>
                        <a href="tel:+0123-456789">+0123-456789</a>
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="footer-address-icon">
                      <i className="icon-mail" />
                    </div>
                    <div className="footer-address-info">
                      <p>
                        <a href="mailto:example@example.com">
                          example@example.com
                        </a>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="ltn__social-media mt-20">
                <ul>
                  <li>
                    <a href="#" title="Facebook">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title="Twitter">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title="Linkedin">
                      <i className="fab fa-linkedin" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title="Youtube">
                      <i className="fab fa-youtube" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-md-6 col-sm-6 col-12">
            <div className="footer-widget footer-menu-widget clearfix">
              <h4 className="footer-title">Company</h4>
              <div className="footer-menu">
                <ul>
       
                  <li>
                    <a href="shop">All Products</a>
                  </li>
                  <li>
                    <a href="locations">Locations Map</a>
                  </li>
                  <li>
                    <a href="faq">FAQ</a>
                  </li>
                  <li>
                    <a href="contact">Contact us</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-md-6 col-sm-6 col-12">
            <div className="footer-widget footer-menu-widget clearfix">
              <h4 className="footer-title">Services</h4>
              <div className="footer-menu">
                <ul>
              
             
                  <li>
                    <a href="login">Login</a>
                  </li>
                  <li>
                    <a href="account">My account</a>
                  </li>
                  <li>
                    <a href="about">Terms &amp; Conditions</a>
                  </li>
            
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-md-6 col-sm-6 col-12">
            <div className="footer-widget footer-menu-widget clearfix">
              <h4 className="footer-title">Customer Care</h4>
              <div className="footer-menu">
                <ul>
                  <li>
                    <a href="login">Login</a>
                  </li>
                  <li>
                    <a href="account">My account</a>
                  </li>
                  <li>
                    <a href="wishlist">Wish List</a>
                  </li>
           
                  <li>
                    <a href="faq">FAQ</a>
                  </li>
                  <li>
                    <a href="contact">Contact us</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 col-sm-12 col-12">
            <div className="footer-widget footer-newsletter-widget">
              <h4 className="footer-title">Newsletter</h4>
              <p>
                Subscribe to our weekly Newsletter and receive updates via
                email.
              </p>
              <div className="footer-newsletter">
                <form action="#">
                  <input type="email" name="email" placeholder="Email*" />
                  <div className="btn-wrapper">
                    <button className="theme-btn-1 btn" type="submit">
                      <i className="fas fa-location-arrow" />
                    </button>
                  </div>
                </form>
              </div>
              <h5 className="mt-30">We Accept</h5>
              <img src="img/icons/payment-4.png" alt="Payment Image" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="ltn__copyright-area ltn__copyright-2 section-bg-7  plr--5">
      <div className="container-fluid ltn__border-top-2">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="ltn__copyright-design clearfix">
              <p>
                PulmoCare<span className="current-year" />
              </p>
            </div>
          </div>
          <div className="col-md-6 col-12 align-self-center">
            <div className="ltn__copyright-menu text-end">
              <ul>
                <li>
                  <a href="#">Terms &amp; Conditions</a>
                </li>
                <li>
                  <a href="#">Claim</a>
                </li>
                <li>
                  <a href="#">Privacy &amp; Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>

    </div>
  )
}

export default Footer