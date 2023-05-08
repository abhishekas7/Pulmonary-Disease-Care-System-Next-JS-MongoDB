import Product from '@/models/Product'
import db from '@/util/db'
import Script from 'next/script'
import Header from '../components/Header'
import Footer from '../Footer'
import axios from 'axios'
import ProductRating from './ProductRating'
import Swal from "sweetalert2";

export default function k({product}) {
  

  const { _id: productId, price,name,quantity,image} = product;

  // const addToCartHandler = async () => {
  //   try {
  //     const response = await axios.post('/api/cartoperation/add', {
  //       productId,
  //       name,
  //       price,
  //       quantity: 1,
  //       image,
  //     });
      
  //     if (response.status === 200) {
  //       alert('Product Added');
  //     } else {
  //       alert('Product Add Fails');
  //     }
  //   } catch (error) {
  //     console.error(error.response.data.message); // error message
  //   }
  // };
  


  const addToCartHandler = async () => {
    try {
      const response = await axios.post(`/api/cartoperation/cartoperation?productId=${productId}&name=${name}&price=${price}&quantity=${1}&image=${image}`);
      if (response) {
        Swal.fire({
          icon: "success",
          text: "Item Added Sucessfull",
        })}
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Item Added Sucessfull",
      })
      
    }
  };


  


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
              <div className="col-md-6" >
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
                <div class="product-ratting">
                                        <ul>
                                            <li><a href="#"><i class="fas fa-star"></i></a></li>
                                            <li class="review-total pl-5"> <a href="#"> ( {product.rating} Rating )</a></li>
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
                      <li>
                        <strong>Description</strong>
                        <span>
         
                  {product.description}
              
                        </span>
                      </li>
                      <li>
                        <strong>InStock</strong>
                        <span>{product.quantity}</span>
                      </li>

                      <li>
                        <strong>Company </strong>
                        <span>{product.manufacturer}</span>
                      </li>

                      <li>
                        <strong>Prescription Required </strong>
                        <span>{product.prescription_required==true ? 'Yes' : 'No'}</span>
                      </li>
                    </ul>
                    
                  </div>

                  <ProductRating productId={product._id}/>

    
                  <div className="ltn__product-details-menu-2">
                    <ul>
                 
                      <li>{product.quantity>0?(
                        <button className="theme-btn-1 btn btn-effect-1" onClick={addToCartHandler}><i className="fas fa-shopping-cart" /><span>ADD TO CART</span></button>
                      ):(
                      <button className="theme-btn-1 btn btn-effect-1" disabled ><i className="fas fa-shopping-cart" /><span>OUT OF STOCK</span></button>
                      )}
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
    db.connect()
  const product = await Product.findById(params.productdetails).lean();
  db.disconnect();
  return {
    props: {
      product:product?db.convertDocToObj(product):null,
    },
  };

}
