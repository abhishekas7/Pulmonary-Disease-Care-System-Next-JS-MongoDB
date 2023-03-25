
import Footer from './Footer'
import Header from './components/Header'
import React, { useContext, useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { Store } from '@/util/Store';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { getError } from '@/util/error';
import axios from 'axios';
function Checkout() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const[disable,setdisable]=useState(true)
  const [paymentdetails,setpaymentdet]=useState({
    paymentid:'',
    email:'abhi@gmail'
  })
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;
  // const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, [setValue, shippingAddress]);


  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.cartquantity * c.price, 0)
  ); // 123.4567 => 123.46

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  const handlepayment= async (order)=>{
    const res = await initializeRazorpay();
  
      if (!res) {
        alert("Razorpay SDK Failed to load");
        return;
      }
  
      // Make API call to the serverless API
      const {data,message} = await axios.put('/api/keys/razorpay',{'amount':order.totalPrice});
      
      console.log(data);
      var options = {
        key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        name: "Pulmo Care Pvt Ltd",
        currency: "INR",
        amount: 500,
        order_id: data.id,
        description: "Thankyou for Shopping",
        // image: "https://manuarora.in/logo.png",
        handler: function (response) {
          // Validate payment at server - using webhooks is a better idea.
          setpaymentdet({paymentid: response.razorpay_payment_id});
          console.log(paymentdetails)
        },
        prefill: {
          name: " pulmo",
          email: "pulmo@gmail.com",
          contact: "9678545674",
        },
      };
  
      
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      try {
        console.log('payment added')
        const { status,message } = await axios.put(`/api/orders/${order._id}/pay`,{id:paymentdetails.paymentid,email:paymentdetails.email,status:true});
        if(status){
          toast.success(message)
          // fetchOrder()
        }else{
          toast.error(message)
        }
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
        toast.error(getError(err))
      }
  
  }
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);
  
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
  
      document.body.appendChild(script);
    })}
  

const paymentmethodHandler = (e) => {
    
    if (!e) {
      return toast.error('Payment method is required');
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: e });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: e,
      })
    );

    console.log(e)
  };
  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );

    // router.push('/checkout');
    console.log(cart)
  };
  const [loading,setLoading]=useState(true)
  const placeOrderHandler = async () => {
    try {
      // setLoading(true);
      console.log(cartItems)
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      toast.success(data.message)
      setLoading(false);
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          cartItems: [],
        })  
      );
      handlepayment(data.data)
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };
useEffect(() => {
  // console.log(cart)
}, [])
  return (
    <div>
    <Header/>
<div className='col-12 container mb-4'>
<div className="ltn__checkout-single-content mt-50">
  <h4 className="title-2">Billing Details</h4>
  <div className="ltn__checkout-single-content-info">
  <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
      <h6>Personal Information</h6>
      <div className="row">
        <div className="col-md-6">
          <div className="input-item input-item-name ltn__custom-icon">
          <input name="ltn__lastname" type="text"
            className="w-full form-control"
            id="fullName"
            autoFocus
            {...register('fullName', {
              required: 'Please enter full name',
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="input-item input-item-phone ltn__custom-icon">
            <input type="text" name="ltn__phone" placeholder="phone number" />
          </div>
        </div>
     
     
      </div>
      <div className="row">
   
        <div className="col-lg-12 col-md-12">
          <h6>Address</h6>
          <div className="row">
            <div className="col-md-6">
              <div className="input-item">
              <input type='text'
            className="w-full"
            id="address"
            {...register('address', {
              required: 'Please enter address',
              minLength: { value: 3, message: 'Address is more than 2 chars' },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
              </div>
            </div>
    
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <h6>Town / City</h6>
          <div className="input-item">
          <input type='text'
            className="w-full"
            id="city"
            {...register('city', {
              required: 'Please enter city',
            })}
          />
          {errors.city && (
            <div className="text-red-500 ">{errors.city.message}</div>
          )}
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <h6>Country</h6>
          <div className="input-item">
          <input type='text'
            // className="w-full"
            id="country"
            {...register('country', {
              required: 'Please enter country',
            })}
          />
          {errors.country && (
            <div className="text-red-500 ">{errors.country.message}</div>
          )}
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <h6>Zip</h6>
          <div className="input-item">
          <input type='text'
            // className="w-full"
            id="postalCode"
            {...register('postalCode', {
              required: 'Please enter postal code',
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500 ">{errors.postalCode.message}</div>
          )}
          </div>
        </div>
      </div>
      <p>
        <label className="input-info-save mb-0">
          {/* <input type="checkbox" name="agree" /> Create an account? */}
        </label>
      </p>
      <h6>Order Notes (optional)</h6>
      <div className="input-item input-item-textarea ltn__custom-icon">
        <textarea
          name="ltn__message"
          placeholder="Notes about your order, e.g. special notes for delivery."
          defaultValue={""}
        />
      </div>
      <button type='submit'className='theme-btn-1 btn btn-effect-1' >submit</button>
    </form>
  </div>
</div>
<div className='row'>
<div className="col-lg-6">
  <div className="ltn__checkout-payment-method mt-50">
    <h4 className="title-2">Payment Method</h4>
    <div id="checkout_accordion_1">
      {/* card */}
      <div className="card">
        <h5
          className="collapsed ltn__card-title"
          data-bs-toggle="collapse"
          data-bs-target="#faq-item-2-1"
          aria-expanded="false"
        >
          Check payments
        </h5>
        <div
          id="faq-item-2-1"
          className="collapse"
          data-bs-parent="#checkout_accordion_1"
        >
          <div className="card-body">
            <p>
              Please send a check to Store Name, Store Street, Store Town, Store
              State / County, Store Postcode.
            </p>
          </div>
        </div>
      </div>
      {/* card */}
      <div className="card">
        <h5
          className="ltn__card-title"
          data-bs-toggle="collapse"
          data-bs-target="#faq-item-2-2"
          aria-expanded="true"
          onClick={()=>paymentmethodHandler('Cash on Delivery')}
        >
          Cash on delivery
        </h5>
        <div
          id="faq-item-2-2"
          className="collapse show"
          data-bs-parent="#checkout_accordion_1"
          // onClick={()=>paymentmethodHandler('Cash on Delivery')}
        >
          <div className="card-body">
            <p>Pay with cash upon delivery.</p>
          </div>
        </div>
      </div>
      {/* card */}
      <div className="card">
        <h5
          className="collapsed ltn__card-title"
          data-bs-toggle="collapse"
          data-bs-target="#faq-item-2-3"
          aria-expanded="false"
          onClick={()=>paymentmethodHandler('Razorpay')}
        >
          Razorpay <img src="img/icons/payment-3.png" alt="#" />
        </h5>
        <div
          id="faq-item-2-3"
          className="collapse"
          data-bs-parent="#checkout_accordion_1"
        >
          <div className="card-body">
            <p>
              Pay via PayPal; you can pay with your credit card if you don’t
              have a PayPal account.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="ltn__payment-note mt-30 mb-30">
      <p>
        Your personal data will be used to process your order, support your
        experience throughout this website, and for other purposes described in
        our privacy policy.
      </p>
    </div>
    <button className='theme-btn-1 btn btn-effect-1'
      // className="btn theme-btn-1 btn-effect-1 text-uppercase"
      type="button"
      onClick={()=>placeOrderHandler()}
    >
      {loading?'loading':'Place order'}
    </button>



  </div>
</div>

<div className="col-lg-6">
  <div className="shoping-cart-total mt-50">
    <h4 className="title-2">Cart Totals</h4>
    <table className="table">
      <tbody>
      <tr>
          <td>Total Amount</td>
          <td>{totalPrice}</td>
        </tr>
        <tr>
          <td>Shipping</td>
          <td>{shippingPrice}</td>
        </tr>
        <tr>
          <td>Tax</td>
          <td>{taxPrice}</td>
        </tr>
        <tr>
          <td>
            <strong>Order Total</strong>
          </td>
          <td>
            <strong>{totalPrice}</strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

</div>


</div>



    <Footer/>
    </div>
  )
}

export default Checkout