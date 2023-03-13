import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  return (
<>
<section class="specialist-area section-padding">
<div className="container">
    <Header/>
</div>
<div class="container">
       <div className="row">
       <div class="col-lg-6 offset-lg-3">
                    <div class="section-top text-center">
                        <h2>Products</h2>
                        <p>View Products</p>
                    </div>
                </div>
       </div>

<div className="col-12">
   <div className="row">
<div className="col-md-3">
<ProductCard/>
</div>
<div className="col-md-3">
<ProductCard/>
</div>

 </div>
</div>


        </div>
    </section>
</>
  )
}

export default ProductList