
import Product from '@/models/Product'
import db from '@/util/db'
import Script from 'next/script'
import React from 'react'
import Header from './components/Header'

import Links from './Links'
import Link from 'next/link'
import Rating from 'react-rating'

const productpage = ({products}) => {
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
            <li>
              <div className="showing-product-number text-right">
                <span>Showing 1–12 of 18 results</span>
              </div>
            </li>
     
          </ul>
        </div>
        <div className="tab-content">
          <div className="tab-pane fade active show" id="liton_product_grid">
            <div className="ltn__product-tab-content-inner ltn__product-grid-view">
              <div className="row">
             
              {products.map((item,i) => (
            <div className="col-xl-4 col-sm-6 col-6" key={i}>
            <div className="ltn__product-item ltn__product-item-3 text-left">
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
                {/* <div className="product-ratting">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fas fa-star" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fas fa-star" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fas fa-star" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fas fa-star-half-alt" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="far fa-star" />
                      </a>
                    </li>
                  </ul>
                </div> */}
             <h2 className="product-title" style={{ color: 'grey' }}>
  <a href="product-details.html">{item.manufacturer}</a>
</h2>
                <h3 className="product-title">
                  <a href="product-details.html">{item.name}</a>
                </h3>
                <div className="product-price">
                <span style={{fontSize:'20px',color:'balck'}}>&#x20B9;{item.price}</span>

                
                </div>
                <div>
  <ul className='no-bullet'>
    <li>
      <a href="#">
        <i className="fas fa-star" />
      </a>
    </li>
  </ul>
</div>

              </div>
            </div>
          </div>
      ))}
          
   

            
           


                {/*  */}
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="liton_product_list">
            <div className="ltn__product-tab-content-inner ltn__product-list-view">
              <div className="row">
                {/* ltn__product-item */}
                {products.map((item,i) => (
                <div className="col-lg-12">
                  <div className="ltn__product-item ltn__product-item-3">
                    <div className="product-img">
                      <a href="product-details.html">
                      <img src={`images/${item.image}`} alt="" />
                      </a>
                      <div className="product-badge">
                        <ul>
                          <li className="sale-badge">New</li>
                        </ul>
                      </div>
                    </div>
                    <div className="product-info">
                      <h2 className="product-title">
                        <a href="product-details.html">{item.name}</a>
                      </h2>
                      <div className="product-ratting">
                        <ul>
                          <li>
                            <a href="#">
                              <i className="fas fa-star" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fas fa-star" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fas fa-star" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fas fa-star-half-alt" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="far fa-star" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="product-price">
                        <span>{item.price}</span>
                        
                      </div>
                      <div className="product-brief">
                        <p>
                        {item.description}
                        </p>
                      </div>
                      <div className="product-hover-action">
                        <ul>
                          <li>
                            <a
                              href="#"
                              title="Quick View"
                             
                            >
                              <i className="far fa-eye" />
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              title="Add to Cart"
                            
                            >
                              <i className="fas fa-shopping-cart" />
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              title="Wishlist"
                              data-bs-toggle="modal"
                              data-bs-target="#liton_wishlist_modal"
                            >
                              <i className="far fa-heart" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="ltn__pagination-area text-center">
          <div className="ltn__pagination">
            <ul>
              <li>
                <a href="#">
                  <i className="fas fa-angle-double-left" />
                </a>
              </li>
              <li>
                <a href="#">1</a>
              </li>
              <li className="active">
                <a href="#">2</a>
              </li>
              <li>
                <a href="#">3</a>
              </li>
              <li>
                <a href="#">...</a>
              </li>
              <li>
                <a href="#">10</a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-angle-double-right" />
                </a>
              </li>
            </ul>
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
  const products = await Product.find().lean();
  // console.log(products);
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}