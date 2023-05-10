/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Product from '@/models/Product'
import db from '@/util/db'
import Script from 'next/script'
import React from 'react'
import Header from './components/Header'
import Links from './Links'
import Link from 'next/link'


const productpage = ({products}) => {

  function shortenProductName(name) {
    if (name.length > 10) {
      return name.substring(0, 25) + '...';
    } else {
      return name;
    }
  }

  return (
    
    <div>

      <Header/>

      <div className="col-lg-12 mb-3">
        <h1 className="section-title text-center">Products</h1>
      </div>
   
      <div className="ltn__product-area ltn__product-gutter mb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 order-lg-2 mb-120">
              <div className="ltn__shop-options">
                <ul>
                  <li>
                    <div className="ltn__grid-list-tab-menu ">
                      <div className="nav">
                        <a
                    className="active show"
                    data-bs-toggle="tab"
                    href="#liton_product_grid"
                  >
                          <i className="fas fa-th-large" />
                        </a>
                        <a data-bs-toggle="tab" href="#liton_product_list">
                          <i className="fas fa-list" />
                        </a>
                      </div>
                    </div>
                  </li>
       
     
                </ul>
              </div>
              <div className='col-12'>
                <div className='row'>
                  {products.map((item,i) => (
                    <div className="col-xl-4 col-sm-6 col-6" style={{height:'500'}}>
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
    
      
            </div>
            <div className="col-lg-4  mb-120">
              <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar">
                {/* Category Widget */}
                <div className="widget ltn__menu-widget">
                  <h4 className="ltn__widget-title ltn__widget-title-border">
                    Product categories
                  </h4>
                  <ul>
                    <li>
                      <a href="portfolio-details.html">
                        Hand Sanitizer{" "}
                        <span>
                          <i className="fas fa-long-arrow-alt-right" />
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="portfolio-details.html">
                        Lab N95 Face Mask{" "}
                        <span>
                          <i className="fas fa-long-arrow-alt-right" />
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="portfolio-details.html">
                        Hand Gloves{" "}
                        <span>
                          <i className="fas fa-long-arrow-alt-right" />
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="portfolio-details.html">
                        Medical Equipment{" "}
                        <span>
                          <i className="fas fa-long-arrow-alt-right" />
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="portfolio-details.html">
                        New Arrival Product{" "}
                        <span>
                          <i className="fas fa-long-arrow-alt-right" />
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="portfolio-details.html">
                        Uncategorized{" "}
                        <span>
                          <i className="fas fa-long-arrow-alt-right" />
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="portfolio-details.html">
                        Special Offers{" "}
                        <span>
                          <i className="fas fa-long-arrow-alt-right" />
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Price Filter Widget */}
                <div className="widget ltn__price-filter-widget">
                  <h4 className="ltn__widget-title ltn__widget-title-border">
                    Filter by price
                  </h4>
                  <div className="price_filter">
                    <div className="price_slider_amount">
                      <input type="submit" defaultValue="Your range:" />
                      <input
                  type="text"
                  className="amount"
                  name="price"
                  placeholder="Add Your Price"
                />
                    </div>
                    <div className="slider-range ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all">
                      <div
                  className="ui-slider-range ui-widget-header ui-corner-all"
                  style={{ left: "0%", width: "29.2929%" }}
                />
                      <span
                  className="ui-slider-handle ui-state-default ui-corner-all"
                  tabIndex={0}
                  style={{ left: "0%" }}
                />
                      <span
                  className="ui-slider-handle ui-state-default ui-corner-all"
                  tabIndex={0}
                  style={{ left: "29.2929%" }}
                />
                    </div>
                  </div>
                </div>
   
                <div className="widget ltn__search-widget">
                  <h4 className="ltn__widget-title ltn__widget-title-border">
                    Search Objects
                  </h4>
                  <form action="#">
                    <input
                type="text"
                name="search"
                placeholder="Search your keyword..."
              />
                    <button type="submit">
                      <i className="fas fa-search" />
                    </button>
                  </form>
                </div>

   
   
              </aside>
            </div>
          </div>
        </div>
      </div>



      <Script src="js/plugins.js"></Script>



    </div>
  )
}

export default productpage

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({status:true}).lean();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}