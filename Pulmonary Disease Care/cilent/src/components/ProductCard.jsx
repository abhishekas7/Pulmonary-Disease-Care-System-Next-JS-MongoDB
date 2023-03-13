import React from 'react'
import { Link } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../css/custom.css'
import pic from '../images/medi.jpg';

const ProductCard = () => {
  return (
    <div>  
   <div class="product-card">
		<div class="badge">Hot</div>
		<div class="product-tumb">
		<Link to="/singleproduct">	<img src={pic}alt=""/></Link>
		</div>
		<div class="product-details">
			<span class="product-catagory">Company</span>
      <h4><Link to="">Product Name</Link></h4>
			<p>Description</p>
			<div class="product-bottom-details">
				<div class="product-price"><small>&#8364;96.00</small>$230.99</div>
				<div class="product-links">
					{/* <a href=""><i class="fa fa-heart"></i></a>
					<a href=""><i class="fa fa-shopping-cart"></i></a> */}
				</div>
			</div>
		</div>
	</div>
</div>

  )
}

export default ProductCard