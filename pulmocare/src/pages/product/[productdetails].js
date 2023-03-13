import Product from '@/models/Product'
import db from '@/util/db'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import Header from '../Header'
import { useEffect } from 'react'
import Footer from '../Footer'
import IncDecCounter from '@/components/IncDecCounter'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Store } from '@/util/Store'
import { useContext } from 'react'
import axios from 'axios'


export default function k({product}) {

  const { state, dispatch } = useContext(Store);

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/product/${product._id}`);
    console.log(data)

    // if (data.countInStock < quantity) {
    //   return toast.error('Sorry. Product is out of stock');
    // }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/Addtocart');
  }


const router=useRouter()
  return (
  <>

{/* Place favicon.png in the root directory */}

<Header/>
  <div className="body-wrapper mt-5">
  {/* SHOP DETAILS AREA START */}

  <div className="ltn__shop-details-area pb-85">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <div className="ltn__shop-details-inner mb-60">
            <div className="row">
              <div className="col-md-6">
                <div className="ltn__shop-details-img-gallery">
                  <div className="ltn__shop-details-large-img">
                    <div className="single-small-img">
                    {/* <img src={`images/${product.image}`} alt="Image" /> */}
                    <img src={`/images/${product.image}`} alt='product image'/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="modal-product-info shop-details-info pl-0">
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
                      <li className="review-total">
                        {" "}
                        <a href="#"> ( 95 Reviews )</a>
                      </li>
                    </ul>
                  </div>
                  <h3>{product.name}</h3>
                  <div className="product-price">
                    <span><span>&#8377;</span>{product.price}</span>
                    {/* <del>$65.00</del> */}
                  </div>
                  <div className="modal-product-meta ltn__product-details-menu-1">
                    <ul>
                      <li>
                        <strong>Categories:</strong>
                        <span>
                        {product.category}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="ltn__product-details-menu-2">
                    <ul>
                 
                      <li>
        
                          <button className="theme-btn-1 btn btn-effect-1" onClick={addToCartHandler}><i className="fas fa-shopping-cart" /><span>ADD TO CART</span></button>
                 
                      </li>
                    </ul>
                  </div>
           
                  <hr />
          
                  <hr />

                </div>
              </div>
            </div>
          </div>
          {/* Shop Tab Start */}
          <div className="ltn__shop-details-tab-inner ltn__shop-details-tab-inner-2">
            <div className="ltn__shop-details-tab-menu">
              <div className="nav">
                <a
                  className="active show"
                  data-bs-toggle="tab"
                  href="#liton_tab_details_1_1"
                >
                  Description
                </a>
              </div>
            </div>
            <div className="tab-content">
              <div
                className="tab-pane fade active show"
                id="liton_tab_details_1_1"
              >
                <div className="ltn__shop-details-tab-content-inner">
                  <h4 className="title-2">Product Description</h4>
                  <p>
                  {product.description}
                  </p>
    
                </div>
              </div>
      
            </div>
          </div>
          {/* Shop Tab End */}
        </div>
        <div className="col-lg-4">
          <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar">
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
                        <img src="/images/1.png" alt="#" />
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
                        <a href="product-details.html">
                          Mixel Solid Seat Cover
                        </a>
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
                      <img src="/images/2.png" alt="#" />
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
                      <img src="/images/3.png" alt="#" />
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
                        <a href="product-details.html">
                          Coil Spring Conversion
                        </a>
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
            {/* Banner Widget */}
  
          </aside>
        </div>
      </div>
    </div>
  </div>
  {/* SHOP DETAILS AREA END */}


<Footer/>

</div>
<Script src="js/main.js"></Script>
<Script src="js/plugins.js"></Script>



  </>
  )
}
export async function getServerSideProps({ params }) {
  // const product =await Product.findbyId(params.productdetails
  const product = await Product.findById(params.productdetails).lean();
  db.connect()
  // const product = await Product.findOne({ _id: params.productdetails});
  console.log(product);
  db.disconnect();
  return {
    props: {
      product:product?db.convertDocToObj(product):null,
    },
  };

}
