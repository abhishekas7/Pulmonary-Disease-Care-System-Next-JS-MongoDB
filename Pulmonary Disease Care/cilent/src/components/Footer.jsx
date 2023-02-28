import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
  <>
     <footer className="footer-area section-padding">
        <div className="footer-widget">
            <div className="container">
                <div className="row">
                    <div className="col-xl-2 col-lg-3">
                        <div className="single-widget-home mb-5 mb-lg-0">
                            <h3 className="mb-4">top products</h3>
                            <ul>
                                <li className="mb-2"><Link to="#">managed website</Link></li>
                                <li className="mb-2"><Link to="#">managed reputation</Link></li>
                                <li className="mb-2"><Link to="#">power tools</Link></li>
                                <li><Link to="#">marketing service</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-5 offset-xl-1 col-lg-6">
                        <div className="single-widget-home mb-5 mb-lg-0">
                            <h3 className="mb-4">newsletter</h3>
                            <p className="mb-4">You can trust us. we only send promo offers, not a single.</p>  
                            <form action="#">
                                <input type="email" placeholder="Your email here" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Your email here'" required/>
                                <button type="submit" className="template-btn">subscribe now</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-xl-3 offset-xl-1 col-lg-3">
                        <div className="single-widge-home">
                            <h3 className="mb-4">instagram feed</h3>
                            <div className="feed">
                                <img src="assets/images/feed1.jpg" alt="feed"/>
                                <img src="assets/images/feed2.jpg" alt="feed"/>
                                <img src="assets/images/feed3.jpg" alt="feed"/>
                                <img src="assets/images/feed4.jpg" alt="feed"/>
                                <img src="assets/images/feed5.jpg" alt="feed"/>
                                <img src="assets/images/feed6.jpg" alt="feed"/>
                                <img src="assets/images/feed7.jpg" alt="feed"/>
                                <img src="assets/images/feed8.jpg" alt="feed"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="footer-copyright">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-6">
                        <span>
Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <Link to="https://colorlib.com" target="_blank">Colorlib</Link>
</span>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="social-icons">
                            <ul>
                                <li><Link to="#"><i className="fa fa-facebook"></i></Link></li>
                                <li><Link to="#"><i className="fa fa-twitter"></i></Link></li>
                                <li><Link to="#"><i className="fa fa-dribbble"></i></Link></li>
                                <li><Link to="#"><i className="fa fa-behance"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  </>
  )
}

export default Footer