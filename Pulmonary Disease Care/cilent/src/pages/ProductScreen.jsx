import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ProductCard from '../components/ProductCard';
import ReactImageMagnify from "react-image-magnify";
import pic from '../images/medi.jpg';

const ProductList = () => {
  return (
<>
<section class="specialist-area section-padding vh-100">
<div className="container">
    <Header/>
</div>
<div class="container">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
          <div style={{zIndex:2000}}>
<ReactImageMagnify enlargedImageContainerClassName="zooming" {...{
    smallImage: {
        alt: 'Wristwatch by Ted Baker London',
        isFluidWidth: true,
        src: `pic`
    },
    
    largeImage: {
        src: `pic`,
        width: 1200,
        height: 1800
    }
}} />
</div>
          </div>
          <div className="col-md-6 ">
            <div className="product-info">
              <div className="title">
              <h3 class="typo-list">This is header 03</h3>
              <div class="product-price-discount"><span>$39.00</span><span class="line-through">$29.00</span></div>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <div className="features_medi">
            <ul class="unordered-list">
                                <li>Effectively relieve Asthma symptoms with the use of this inhaler.</li>
                                <li>Fast acting relief from breathing difficulties</li>
                
                                <li>Branded version of Salbutamol</li>
                                <li>To be used for Asthma or COPD</li>
                                <li>Standard universal reliever inhaler</li>
                            </ul>
                            
            </div>
            <div className="row mt-4">
      
            <div className="col-6">
            <Link to="" class="genric-btn success radius">ADD TO CART</Link>
            </div>
            </div>
          </div>
      
        </div>
      </div>
        </div>
    </section>
</>
  )
}

export default ProductList