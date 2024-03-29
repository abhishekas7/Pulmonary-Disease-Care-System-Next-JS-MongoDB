/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Product from '@/models/Product'
import db from '@/util/db'
import Script from 'next/script'
import React from 'react'
import Header from './components/Header'
import Links from './Links'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router'

const ProductPage = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(false);

  const route = useRouter();
  const query = route.query;
  console.log(query.search);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    setSearchResults(products.filter(item => item.name.includes(searchTerm)));
  };

  function shortenProductName(name) {
    if (name.length > 10) {
      return name.substring(0, 25) + '...';
    } else {
      return name;
    }
  }

  return (
    <div>
      <Header />

      <div className="col-lg-12 mb-3">
        <h1 className="section-title text-center">Products</h1>
      </div>

      <div className="ltn__product-area ltn__product-gutter mb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 order-lg-2 mb-120">
              <div className="ltn__shop-options">
      
              </div>

              <div className='col-12'>
         

         
                {searchResults ? (
                  <div className="col-12">
                    <div className="row">
                      {searchResults.map((item, i) => (
                        <div className="col-xl-4 col-sm-6 col-6" style={{ height: '500px' }} key={i}>
                          <div className="ltn__product-item ltn__product-item-3 text-center">
                            <div className="product-img">
                              <Link href={`/product/${item._id}`}>
                                <img src={`images/${item.image}`} alt="" />
                              </Link>
                              <div className="product-badge">
                                <ul>
                                  <li className="sale-badge">New</li>
                                </ul>
                              </div>
                            </div>
                            <div className="product-info">
                              <div className="product-ratting">
                                <ul>
                                  <li>
                                    <a href="#">
                                    <span>{item.rating}</span>
  <i className="fas fa-star" />
</a>
</li>
</ul>
</div>
<h2 className="product-title">
<a href="product-details.html">{shortenProductName(item.name)}</a>
</h2>
<div className="product-price">
<span>&#x20B9;{item.price}</span>
{/* <del>$162.00</del> */}
</div>
</div>
</div>
</div>
))}
</div>
</div>
) : (
<div className='row'>
{products.map((item, i) => (
<div className="col-xl-4 col-sm-6 col-6" style={{ height: '500px' }} key={i}>
<div className="ltn__product-item ltn__product-item-3 text-center">
<div className="product-img">
<Link href={`/product/${item._id}`}>
<img src={`images/${item.image}`} alt="" />
</Link>
<div className="product-badge">
<ul>
<li className="sale-badge">New</li>
</ul>
</div>
</div>
<div className="product-info">
<div className="product-ratting">
<ul>
<li>
<a href="#">
<span>{item.rating}</span>
<i className="fas fa-star" />
</a>
</li>
</ul>
</div>
<h2 className="product-title">
<a href="product-details.html">{shortenProductName(item.name)}</a>
</h2>
<div className="product-price">
<span>&#x20B9;{item.price}</span>
{/* <del>$162.00</del> */}
</div>
</div>
</div>
</div>
))}
</div>
)}
</div>
</div>
<div className="col-lg-4  mb-120">
<aside className="sidebar ltn__shop-sidebar ltn__right-sidebar">

<div className="widget ltn__search-widget">
<h4 className="ltn__widget-title ltn__widget-title-border">
Search Objects
</h4>




<input
                    type="text"
                    name="search"
                    placeholder="Search your keyword..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button type="submit" onClick={handleSearch}>
                    <i className="fas fa-search" />
                  </button>

</div>
{/* Category Widget */}
<div className="widget ltn__menu-widget">
<h4 className="ltn__widget-title ltn__widget-title-border">
Product categories
</h4>
<ul>
<li>
<a href="#">
Hand Sanitizer{" "}
<span>
<i className="fas fa-long-arrow-alt-right" />
</span>
</a>
</li>
<li>
<a href="#">
Lab N95 Face Mask{" "}
<span>
<i className="fas fa-long-arrow-alt-right" />
</span>
</a>
</li>
<li>
<a href="#">
Hand Gloves{" "}
<span>
<i className="fas fa-long-arrow-alt-right" />
</span>
</a>
</li>
<li>
<a href="#">
Medical Equipment{" "}
<span>
<i className="fas fa-long-arrow-alt-right" />
</span>
</a>
</li>
<li>
<a href="#">
New Arrival Product{" "}
<span>
<i className="fas fa-long-arrow-alt-right" />
</span>
</a>
</li>
<li>
<a href="#">
Uncategorized{" "}
<span>
<i className="fas fa-long-arrow-alt-right" />
</span>
</a>
</li>
<li>
<a href="#">
Special Offers{" "}
<span>
<i className="fas fa-long-arrow-alt-right" />
</span>
</a>
</li>
</ul>
</div>



</aside>
</div>
</div>
</div>
</div>
</div>


);
}

// Existing code...

export default ProductPage;

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({ status: true }).lean();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}

