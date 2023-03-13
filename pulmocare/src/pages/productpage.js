/* eslint-disable @next/next/no-css-tags */
import Script from 'next/script'
import React from 'react'
import Header from './Header'
import Links from './Links'

const productpage = () => {
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
            <li>
              <div className="short-by text-center">
                <select className="nice-select" style={{ display: "none" }}>
                  <option>Default Sorting</option>
                  <option>Sort by popularity</option>
                  <option>Sort by new arrivals</option>
                  <option>Sort by price: low to high</option>
                  <option>Sort by price: high to low</option>
                </select>
                <div className="nice-select" tabIndex={0}>
                  <span className="current">Default Sorting</span>
                  <ul className="list">
                    <li
                      data-value="Default Sorting"
                      className="option selected"
                    >
                      Default Sorting
                    </li>
                    <li data-value="Sort by popularity" className="option">
                      Sort by popularity
                    </li>
                    <li data-value="Sort by new arrivals" className="option">
                      Sort by new arrivals
                    </li>
                    <li
                      data-value="Sort by price: low to high"
                      className="option"
                    >
                      Sort by price: low to high
                    </li>
                    <li
                      data-value="Sort by price: high to low"
                      className="option"
                    >
                      Sort by price: high to low
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="tab-content">
          <div className="tab-pane fade active show" id="liton_product_grid">
            <div className="ltn__product-tab-content-inner ltn__product-grid-view">
              <div className="row">
                {/* ltn__product-item */}
                <div className="col-xl-4 col-sm-6 col-6">
                  <div className="ltn__product-item ltn__product-item-3 text-center">
                    <div className="product-img">
                      <a href="productdetails">
                        <img src="img/product/1.png" alt="#" />
                      </a>
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
                      <h2 className="product-title">
                        <a href="product-details.html">Digital Stethoscope</a>
                      </h2>
                      <div className="product-price">
                        <span>$149.00</span>
                        <del>$162.00</del>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ltn__product-item */}
            
           


                {/*  */}
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="liton_product_list">
            <div className="ltn__product-tab-content-inner ltn__product-list-view">
              <div className="row">
                {/* ltn__product-item */}
                <div className="col-lg-12">
                  <div className="ltn__product-item ltn__product-item-3">
                    <div className="product-img">
                      <a href="product-details.html">
                        <img src="img/product/1.png" alt="#" />
                      </a>
                      <div className="product-badge">
                        <ul>
                          <li className="sale-badge">New</li>
                        </ul>
                      </div>
                    </div>
                    <div className="product-info">
                      <h2 className="product-title">
                        <a href="product-details.html">Thermometer Gun</a>
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
                        <span>$165.00</span>
                        <del>$1720.00</del>
                      </div>
                      <div className="product-brief">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Recusandae asperiores sit odit nesciunt,
                          aliquid, deleniti non et ut dolorem!
                        </p>
                      </div>
                      <div className="product-hover-action">
                        <ul>
                          <li>
                            <a
                              href="#"
                              title="Quick View"
                              data-bs-toggle="modal"
                              data-bs-target="#quick_view_modal"
                            >
                              <i className="far fa-eye" />
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              title="Add to Cart"
                              data-bs-toggle="modal"
                              data-bs-target="#add_to_cart_modal"
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
                {/* ltn__product-item */}
                <div className="col-lg-12">
                  <div className="ltn__product-item ltn__product-item-3">
                    <div className="product-img">
                      <a href="product-details.html">
                        <img src="img/product/2.png" alt="#" />
                      </a>
                    </div>
                    <div className="product-info">
                      <h2 className="product-title">
                        <a href="product-details.html">Cosmetic Containers</a>
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
                        <span>$165.00</span>
                        <del>$1720.00</del>
                      </div>
                      <div className="product-brief">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Recusandae asperiores sit odit nesciunt,
                          aliquid, deleniti non et ut dolorem!
                        </p>
                      </div>
                      <div className="product-hover-action">
                        <ul>
                          <li>
                            <a
                              href="#"
                              title="Quick View"
                              data-bs-toggle="modal"
                              data-bs-target="#quick_view_modal"
                            >
                              <i className="far fa-eye" />
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              title="Add to Cart"
                              data-bs-toggle="modal"
                              data-bs-target="#add_to_cart_modal"
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
                {/* ltn__product-item */}
                <div className="col-lg-12">
                  <div className="ltn__product-item ltn__product-item-3">
                    <div className="product-img">
                      <a href="product-details.html">
                        <img src="img/product/3.png" alt="#" />
                      </a>
                      <div className="product-badge">
                        <ul>
                          <li className="sale-badge">New</li>
                        </ul>
                      </div>
                    </div>
                    <div className="product-info">
                      <h2 className="product-title">
                        <a href="product-details.html">Thermometer Gun</a>
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
                        <span>$165.00</span>
                        <del>$1720.00</del>
                      </div>
                      <div className="product-brief">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Recusandae asperiores sit odit nesciunt,
                          aliquid, deleniti non et ut dolorem!
                        </p>
                      </div>
                      <div className="product-hover-action">
                        <ul>
                          <li>
                            <a
                              href="#"
                              title="Quick View"
                              data-bs-toggle="modal"
                              data-bs-target="#quick_view_modal"
                            >
                              <i className="far fa-eye" />
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              title="Add to Cart"
                              data-bs-toggle="modal"
                              data-bs-target="#add_to_cart_modal"
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
                {/* ltn__product-item */}
                <div className="col-lg-12">
                  <div className="ltn__product-item ltn__product-item-3">
                    <div className="product-img">
                      <a href="product-details.html">
                        <img src="img/product/4.png" alt="#" />
                      </a>
                    </div>
                    <div className="product-info">
                      <h2 className="product-title">
                        <a href="product-details.html">Digital Stethoscope</a>
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
                        <span>$165.00</span>
                        <del>$1720.00</del>
                      </div>
                      <div className="product-brief">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Recusandae asperiores sit odit nesciunt,
                          aliquid, deleniti non et ut dolorem!
                        </p>
                      </div>
                      <div className="product-hover-action">
                        <ul>
                          <li>
                            <a
                              href="#"
                              title="Quick View"
                              data-bs-toggle="modal"
                              data-bs-target="#quick_view_modal"
                            >
                              <i className="far fa-eye" />
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              title="Add to Cart"
                              data-bs-toggle="modal"
                              data-bs-target="#add_to_cart_modal"
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
                {/* ltn__product-item */}
                <div className="col-lg-12">
                  <div className="ltn__product-item ltn__product-item-3">
                    <div className="product-img">
                      <a href="product-details.html">
                        <img src="img/product/5.png" alt="#" />
                      </a>
                      <div className="product-badge">
                        <ul>
                          <li className="sale-badge">Hot</li>
                        </ul>
                      </div>
                    </div>
                    <div className="product-info">
                      <h2 className="product-title">
                        <a href="product-details.html">Thermometer Gun</a>
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
                        <span>$165.00</span>
                        <del>$1720.00</del>
                      </div>
                      <div className="product-brief">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Recusandae asperiores sit odit nesciunt,
                          aliquid, deleniti non et ut dolorem!
                        </p>
                      </div>
                      <div className="product-hover-action">
                        <ul>
                          <li>
                            <a
                              href="#"
                              title="Quick View"
                              data-bs-toggle="modal"
                              data-bs-target="#quick_view_modal"
                            >
                              <i className="far fa-eye" />
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              title="Add to Cart"
                              data-bs-toggle="modal"
                              data-bs-target="#add_to_cart_modal"
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
                {/* ltn__product-item */}
                <div className="col-lg-12">
                  <div className="ltn__product-item ltn__product-item-3">
                    <div className="product-img">
                      <a href="product-details.html">
                        <img src="img/product/6.png" alt="#" />
                      </a>
                      <div className="product-badge">
                        <ul>
                          <li className="sale-badge">New</li>
                        </ul>
                      </div>
                    </div>
                    <div className="product-info">
                      <h2 className="product-title">
                        <a href="product-details.html">Thermometer Gun</a>
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
                        <span>$165.00</span>
                        <del>$1720.00</del>
                      </div>
                      <div className="product-brief">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Recusandae asperiores sit odit nesciunt,
                          aliquid, deleniti non et ut dolorem!
                        </p>
                      </div>
                      <div className="product-hover-action">
                        <ul>
                          <li>
                            <a
                              href="#"
                              title="Quick View"
                              data-bs-toggle="modal"
                              data-bs-target="#quick_view_modal"
                            >
                              <i className="far fa-eye" />
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              title="Add to Cart"
                              data-bs-toggle="modal"
                              data-bs-target="#add_to_cart_modal"
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
                {/* ltn__product-item */}
                <div className="col-lg-12">
                  <div className="ltn__product-item ltn__product-item-3">
                    <div className="product-img">
                      <a href="product-details.html">
                        <img src="img/product/4.png" alt="#" />
                      </a>
                    </div>
                    <div className="product-info">
                      <h2 className="product-title">
                        <a href="product-details.html">Digital Stethoscope</a>
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
                        <span>$165.00</span>
                        <del>$1720.00</del>
                      </div>
                      <div className="product-brief">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Recusandae asperiores sit odit nesciunt,
                          aliquid, deleniti non et ut dolorem!
                        </p>
                      </div>
                      <div className="product-hover-action">
                        <ul>
                          <li>
                            <a
                              href="#"
                              title="Quick View"
                              data-bs-toggle="modal"
                              data-bs-target="#quick_view_modal"
                            >
                              <i className="far fa-eye" />
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              title="Add to Cart"
                              data-bs-toggle="modal"
                              data-bs-target="#add_to_cart_modal"
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
                {/*  */}
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
          {/* Top Rated Product Widget */}
          <div className="widget ltn__top-rated-product-widget">
            <h4 className="ltn__widget-title ltn__widget-title-border">
              Top Rated Product
            </h4>
            <ul>
              <li>
                <div className="top-rated-product-item clearfix">
                  <div className="top-rated-product-img">
                    <a href="product-details.html">
                      <img src="img/product/1.png" alt="#" />
                    </a>
                  </div>
                  <div className="top-rated-product-info">
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
                            <i className="fas fa-star" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fas fa-star" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <h6>
                      <a href="product-details.html">Mixel Solid Seat Cover</a>
                    </h6>
                    <div className="product-price">
                      <span>$49.00</span>
                      <del>$65.00</del>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="top-rated-product-item clearfix">
                  <div className="top-rated-product-img">
                    <a href="product-details.html">
                      <img src="img/product/2.png" alt="#" />
                    </a>
                  </div>
                  <div className="top-rated-product-info">
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
                            <i className="fas fa-star" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fas fa-star" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <h6>
                      <a href="product-details.html">Thermometer Gun</a>
                    </h6>
                    <div className="product-price">
                      <span>$49.00</span>
                      <del>$65.00</del>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="top-rated-product-item clearfix">
                  <div className="top-rated-product-img">
                    <a href="product-details.html">
                      <img src="img/product/3.png" alt="#" />
                    </a>
                  </div>
                  <div className="top-rated-product-info">
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
                    <h6>
                      <a href="product-details.html">Coil Spring Conversion</a>
                    </h6>
                    <div className="product-price">
                      <span>$49.00</span>
                      <del>$65.00</del>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          {/* Search Widget */}
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
          {/* Tagcloud Widget */}
          <div className="widget ltn__tagcloud-widget">
            <h4 className="ltn__widget-title ltn__widget-title-border">
              Popular Tags
            </h4>
            <ul>
              <li>
                <a href="#">Body</a>
              </li>
              <li>
                <a href="#">Doctor</a>
              </li>
              <li>
                <a href="#">Drugs</a>
              </li>
              <li>
                <a href="#">Eye</a>
              </li>
              <li>
                <a href="#">Face</a>
              </li>
              <li>
                <a href="#">Hand</a>
              </li>
              <li>
                <a href="#">Mask</a>
              </li>
              <li>
                <a href="#">Medicine</a>
              </li>
              <li>
                <a href="#">Price</a>
              </li>
              <li>
                <a href="#">Sanitizer</a>
              </li>
              <li>
                <a href="#">Virus</a>
              </li>
            </ul>
          </div>
          {/* Size Widget */}
          <div className="widget ltn__tagcloud-widget ltn__size-widget">
            <h4 className="ltn__widget-title ltn__widget-title-border">
              Product Size
            </h4>
            <ul>
              <li>
                <a href="#">S</a>
              </li>
              <li>
                <a href="#">M</a>
              </li>
              <li>
                <a href="#">L</a>
              </li>
              <li>
                <a href="#">XL</a>
              </li>
              <li>
                <a href="#">XXL</a>
              </li>
            </ul>
          </div>
          {/* Color Widget */}
          <div className="widget ltn__color-widget">
            <h4 className="ltn__widget-title ltn__widget-title-border">
              Product Color
            </h4>
            <ul>
              <li className="black">
                <a href="#" />
              </li>
              <li className="white">
                <a href="#" />
              </li>
              <li className="red">
                <a href="#" />
              </li>
              <li className="silver">
                <a href="#" />
              </li>
              <li className="gray">
                <a href="#" />
              </li>
              <li className="maroon">
                <a href="#" />
              </li>
              <li className="yellow">
                <a href="#" />
              </li>
              <li className="olive">
                <a href="#" />
              </li>
              <li className="lime">
                <a href="#" />
              </li>
              <li className="green">
                <a href="#" />
              </li>
              <li className="aqua">
                <a href="#" />
              </li>
              <li className="teal">
                <a href="#" />
              </li>
              <li className="blue">
                <a href="#" />
              </li>
              <li className="navy">
                <a href="#" />
              </li>
              <li className="fuchsia">
                <a href="#" />
              </li>
              <li className="purple">
                <a href="#" />
              </li>
              <li className="pink">
                <a href="#" />
              </li>
              <li className="nude">
                <a href="#" />
              </li>
              <li className="orange">
                <a href="#" />
              </li>
              <li>
                <a href="#" className="orange" />
              </li>
              <li>
                <a href="#" className="orange" />
              </li>
            </ul>
          </div>
          {/* Banner Widget */}
          <div className="widget ltn__banner-widget">
            <a href="shop.html">
              <img src="img/banner/banner-2.jpg" alt="#" />
            </a>
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