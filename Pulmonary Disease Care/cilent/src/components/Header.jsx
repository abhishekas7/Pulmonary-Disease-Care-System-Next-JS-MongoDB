import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
<>
    <header className="header-area">
        <div className="header-top">
            <div className="container">
                <div className="row">
                    <div className="col-lg-9 d-md-flex">
                        <h6 className="mr-3"><span className="mr-2"><i className="fa fa-mobile"></i></span> call us now! +1 305 708 2563</h6>
                        <h6 className="mr-3"><span className="mr-2"><i className="fa fa-envelope-o"></i></span> medical@example.com</h6>
                        <h6><span className="mr-2"><i className="fa fa-map-marker"></i></span> Find our Location</h6>
                    </div>
                    <div className="col-lg-3">
                        <div className="social-links">
                            <ul>
                                <li><Link to="#"><i className="fa fa-facebook"></i></Link></li>
                                <li><Link to="#"><i className="fa fa-linkedin"></i></Link></li>
                                <li><Link to="#"><i className="fa fa-twitter"></i></Link></li>
                                <li><Link to="#"><i className="fa fa-instagram"></i></Link></li>
                                <li><Link to="#"><i className="fa fa-vimeo"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="header" >
            <div className="container">
                
                <div className="row align-items-center justify-content-between d-flex">
                <div id="logo">
                    <Link to="index.html"><img src="assets/images/logo/logo.png" alt="" title="" /></Link>
                </div>
                <nav id="nav-menu-container">
                    <ul className="nav-menu">
                        <li className="menu-active"><Link to="index.html">Home</Link></li>
                        <li className="#"><Link to="/products">Products</Link></li>
                        <li className="menu-has-children"><Link to="">blog</Link>
                            <ul>
                             sdf
                            </ul>
                        </li>
                        <li><Link to="contact.html">Contact</Link></li>	
                                 <li>
                        <Link to="/login" className="template-btn">LOG IN</Link>

                            </li>
                            <li>
                        <Link to="/register" className="template-btn">REGISTER</Link>

                            </li>		 				          
                    </ul>
                   
                </nav>   		
                </div>
                <div>

                </div>
            </div>
        </div>
    </header>
</>
  )
}

export default Header