import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function ProductModal({product}) {

    const[products,setProduct] = useState([product])


 console.log(productsts);   

  return (
    <div>
               <div className="ltn__quick-view-modal-inner">
              <div className="modal-product-item">
                <div className="row">
                  <div className="col-lg-6 col-12">
                    <div className="modal-product-img">
                      <img src="img/product/4.png" alt="#" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-12">
                    <div className="modal-product-info">
                      <div className="product-ratting">
                        <ul>
                          <li>
                            <Link href="#">
                              <i className="fas fa-star" />
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <i className="fas fa-star" />
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <i className="fas fa-star" />
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <i className="fas fa-star-half-alt" />
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <i className="far fa-star" />
                            </Link>
                          </li>
                          <li className="review-total">
                            {" "}
                            <Link href="#"> ( 95 Reviews )</Link>
                          </li>
                        </ul>
                      </div>
                      <h3>
                        <Link href="product-details.html">{product.name}</Link>
                      </h3>
               
                      <div className="modal-product-brief">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Dignissimos repellendus repudiandae incidunt
                          quidem pariatur expedita, quo quis modi tempore non.
                        </p>
                      </div>
                      <div className="modal-product-meta ltn__product-details-menu-1 d-none">
                        <ul>
                          <li>
                            <strong>Categories:</strong>
                            <span>
                              <Link href="#">Parts</Link>
                              <Link href="#">Car</Link>
                              <Link href="#">Seat</Link>
                              <Link href="#">Cover</Link>
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="ltn__product-details-menu-2 d-none">
                        <ul>
                          <li>
                            <div className="cart-plus-minus">
                              <input
                                type="text"
                                defaultValue="02"
                                name="qtybutton"
                                className="cart-plus-minus-box"
                              />
                            </div>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="theme-btn-1 btn btn-effect-1"
                              title="Add to Cart"
                              data-bs-toggle="modal"
                              data-bs-target="#add_to_cart_modal"
                            >
                              <i className="fas fa-shopping-cart" />
                              <span>ADD TO CART</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <hr> */}
                      <div className="ltn__product-details-menu-3">
                        <ul>
                          <li>
                            <Link
                              href="#"
                              className=""
                              title="Wishlist"
                              data-bs-toggle="modal"
                              data-bs-target="#liton_wishlist_modal"
                            >
                              <i className="far fa-heart" />
                              <span>Add to Wishlist</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className=""
                              title="Compare"
                              data-bs-toggle="modal"
                              data-bs-target="#quick_view_modal"
                            >
                              <i className="fas fa-exchange-alt" />
                              <span>Compare</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <hr />
                      <div className="ltn__social-media">
                        <ul>
                          <li>Share:</li>
                          <li>
                            <Link href="#" title="Facebook">
                              <i className="fab fa-facebook-f" />
                            </Link>
                          </li>
                          <li>
                            <Link href="#" title="Twitter">
                              <i className="fab fa-twitter" />
                            </Link>
                          </li>
                          <li>
                            <Link href="#" title="Linkedin">
                              <i className="fab fa-linkedin" />
                            </Link>
                          </li>
                          <li>
                            <Link href="#" title="Instagram">
                              <i className="fab fa-instagram" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <label className="float-end mb-0">
                        <Link
                          className="text-decoration"
                          href="product-details.html"
                        >
                          <small>View Details</small>
                        </Link>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </div>
  )
}

export default ProductModal