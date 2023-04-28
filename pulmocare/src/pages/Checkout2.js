import React, { useEffect, useState } from 'react'

import Header from './components/Header'
import Footer from './Footer'
import Accolite from './components/Accolite'
import Modalc from '@/components/Modal'
import Address from './cart/AddressView'
import AddressForm from './checkout/AddressForm'
import axios from 'axios'
import { getSession } from 'next-auth/react'
import db from '@/util/db'
import CartSchema from "@/models/CartSchema";




function Checkout2({cartItem}) {

const [cartitems,Setcartitems] =useState(cartItem)

const cartSubtotal = cartitems.reduce((total, item) => {
  return total + item.products.reduce((subtotal, product) => {
    return subtotal + product.price * product.quantity;
  }, 0);
}, 0);

  return (
    <div>
        <Header/>

        <div>
        <div className="ltn__blog-area mb-120">
  <div className="container">
    <div className="row">
      <div className="col-lg-8">
     <div className="ltn__blog-brief mt-3">

      <div className='ltn__blog-item ltn__blog-item-5'>
      <div className="ltn__blog-meta">
        
    <ul>
      <li className="ltn__blog-category">
        <a href="#">Checkout</a>
      </li>
    </ul>

    <div>
<Accolite header={'Address'} body={<AddressForm/>}/>
<Accolite header={'Address'} body={'dd'}/>
    </div>
  </div>

      </div>


  <div className="ltn__blog-meta-btn">

 
  </div>
</div>

     
      </div>
      <div className="col-lg-4">
        <aside className="sidebar-area blog-sidebar ltn__right-sidebar">



          <div className="widget ltn__popular-post-widget mt-5">
            <h4 className="ltn__widget-title ltn__widget-title-border-2">
              Cart Items
            </h4>
            <ul>
            
              {cartitems.length>0?cartitems.map((data,i)=>(
        <li key={i} className='mt-3'>
         {data.products.map((item)=>(

           <div className="popular-post-widget-item clearfix mt-4">
          <div className="popular-post-widget-img">
          <img
                                src={`..//images/${item.image}`}
                                className="img-fluid img-thumbnail"
                                width={"150px"}
                            />
          </div>
          <div className="popular-post-widget-brief">
            <h6>
            <a href="#" className="">
                                {item.name}
                            </a>
            </h6>
            <div className="ltn__blog-meta">
              <ul>
                <li className="ltn__blog-date">
                  <a href="#">
                    <i className="far fa-money-bill-alt" />
                    {item.price} x {item.quantity} =  {item.price * item.quantity}
                  </a>
                </li>
              </ul>
            </div>
            <hr/>

            
          </div>
          
        </div>
         ))}
     
      </li>
      
  )):(<p>Empty Cart</p>)}
       
         
            </ul>
          </div>

      
   

        </aside>
      </div>
    </div>
  </div>
</div>

        </div>
        <Footer/>
    </div>
  )
}

export default Checkout2

export async function getServerSideProps(context) {
  db.connect();
  const session = await getSession(context);

  const user_id = session.user._id;

  const cartItem = await CartSchema.find({ userId: user_id }).populate('products');

  console.log(cartItem);


  return {
    props: {
      cartItem: JSON.parse(JSON.stringify(cartItem)),
    },
  };
}