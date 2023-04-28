import Footer from "./Footer";
import Header from "./components/Header";
import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { Store } from "@/util/Store";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getError } from "@/util/error";
import axios from "axios";
import db from "@/util/db";
import CartSchema from "@/models/CartSchema";
import { getSession } from "next-auth/react";
import AddressCheck from "./cart/AddressCheck";
import Address from "@/models/Address";

function Checkout({ carts, addressget }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [disable, setdisable] = useState(true);
  const [paymentdetails, setpaymentdet] = useState({
    paymentid: "",
    email: "abhi@gmail",
  });
  const {
    setValue,
  } = useForm();
  const [carts1, setcarts] = useState(carts);
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;
  // const { shippingAddress } = cart;

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  // const itemsPrice = 0;
  //  123.4567 => 123.46
  const itemsPrice = 0;
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(5 * 0.15);
  const totalPrice = round2(
    carts.reduce((total, item) => {
      return (
        total +
        item.products.reduce((subTotal, product) => {
          return subTotal + product.price * product.quantity;
        }, 0)
      );
    }, 0)
  );
  const handlepayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const { data } = await axios.put("/api/keys/razorpay", {
      amount: totalPrice,
    });

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
        setpaymentdet({ paymentid: response.razorpay_payment_id });
        handlepay(paymentdetails);
      },
      prefill: {
        name: " pulmo",
        email: "pulmo@gmail.com",
        contact: "9678545674",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    //  if(paymentdetails.paymentid!==''){
    //   console.log(true)
    //  }
  };
  const handlepay = async (paymentdetails) => {
    try {
      console.log(paymentdetails);
      console.log("payment added");
      const res = await axios.put(`/api/orders/pay`, {
        id: paymentdetails.paymentid,
        email: paymentdetails.email,
        status: true,
      });
      if (res.data.status) {
        console.log(res.data.message);

        try {
          // setLoading(true);
          console.log(res.data.order);
          console.log(carts);
          const address = await axios
            .get("/api/cart/Address")
            .catch((err) => console.error(err));
          console.log(address.data.data[0]._id);

          const cart1 = await axios
            .get("/api/cart/getCartitems")
            .catch((err) => console.error(err));

          console.log(cart1.data.cartItems[0]._id);
          const { data } = await axios.put(
            `/api/orders/${res.data.order._id}/ordered`,
            {
              cart: cart1.data.cartItems[0]._id,
              shippingAddress: address.data.data[0]._id,
              paymentMethod,
              itemsPrice,
              shippingPrice,
              taxPrice,
              totalPrice,
            }
          );
          console.log(data.message);
          setLoading(false);
          dispatch({ type: "CART_CLEAR_ITEMS" });
          Cookies.set(
            "cart",
            JSON.stringify({
              ...cart,
              cartItems: [],
            })
          );
        } catch (err) {
          setLoading(false);
          // handlepayment(data.data)

          toast.error(getError(err));
        }

      } else {
        toast.error(message);
      }
    } catch (err) {
      dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };
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
    });
  };

  const paymentmethodHandler = (e) => {
    if (!e) {
      return toast.error("Payment method is required");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: e });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: e,
      })
    );

    console.log(e);
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // console.log(cart)
  }, []);
  return (
    <div>
      <Header />
      <div className="col-12 container mb-4">
        <div className="ltn__checkout-single-content mt-50">
          <h4 className="title-2">Billing Details</h4>
          <div className="ltn__checkout-single-content-info">
            <AddressCheck addressget={addressget} />
          </div>
        </div>
        <div className="row">
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
                        Please send a check to Store Name, Store Street, Store
                        Town, Store State / County, Store Postcode.
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
                    onClick={() => paymentmethodHandler("Cash on Delivery")}
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
                    onClick={() => paymentmethodHandler("Razorpay")}
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
                        Pay via PayPal; you can pay with your credit card if you
                        don’t have a PayPal account.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ltn__payment-note mt-30 mb-30">
                <p>
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our privacy policy.
                </p>
              </div>
              <button
                className="theme-btn-1 btn btn-effect-1"
                // className="btn theme-btn-1 btn-effect-1 text-uppercase"
                type="button"
                onClick={() => handlepayment()}
              >
                {loading ? "loading" : "Place order"}
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

      <Footer />
    </div>
  );
}

export default Checkout;
export async function getServerSideProps(context) {
  db.connect();
  const session = await getSession(context);

  const user_id = session.user._id;

  const cartItem = await CartSchema.find({ userId: user_id }).populate(
    "products"
  );
  // const cartItem = await CartSchema.find()
  //   .populate("products.productId")
  //   .exec();
  const addressget = await Address.find({ user: user_id });
  // const cartItem = await CartSchema.find()
  //   .populate("products.productId")
  //   .exec();

  return {
    props: {
      carts: JSON.parse(JSON.stringify(cartItem)),
      addressget: JSON.parse(JSON.stringify(addressget)),
    },
  };
}
