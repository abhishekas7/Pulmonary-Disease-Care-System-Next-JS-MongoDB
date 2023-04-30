import { useEffect, useState } from "react";
import axios from "axios";
import { getError } from "@/util/error";
import { useRouter } from "next/router";



function PaymentMethod({cartItem,addressId}) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");
const [cartitems,Setcartitems] =useState(cartItem)

const [addresses, setAddresses] = useState([]);
useEffect(() => {
  fetchAddresses();
}, []);
const fetchAddresses = async () => {
  const response = await axios.get("/api/cart/Addaddress");
  setAddresses(response.data.data);
};

const Route = useRouter()

const cartId = cartItem[0]._id

const cartSubtotal = cartitems.reduce((total, item) => {
    return total + item.products.reduce((subtotal, product) => {
      return subtotal + product.price * product.quantity;
    }, 0);
  }, 0);

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


  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    const payMethod = paymentMethod

    console.log(payMethod);

    if (paymentMethod === "payOnline") {
      try {
        console.log('payment start');
        const response = await axios.post("/api/payment/razorpay", {
          amount: cartSubtotal.toFixed(2) * 100, 
        });
        const { data } = response;
        console.log(data);
        const options = {
          key: process.env.RAZORPAY_KEY,
          amount: data.amount,
          currency: data.currency,
          name: "PulmoCare",
          description: "Test Transaction",
          image: "https://yt3.ggpht.com/a/AATXAJwJnM2kcDmpxoHNa5vsj4CT7FbsoOOsiX6wEQ=s900-c-k-c0xffffffff-no-rj-mo",
          order_id: data.id,
          handler: async function (response) {
            const orderresponse = await axios.post("/api/payment/order", {response,addressId:addressId,cartId:cartId,amount:cartSubtotal,currency:"INR"});
            const {data} = orderresponse
            console.log(data.paymentId);

            if(data.paymentId===data.id){
              Route.push('/order/Orderplaced')
            }
            else{
              console.log('payment failed');
            }

          },

          prefill: {
            name: "Abhishek A S",
            email: "abhi@gmail.com",
            contact: "9999999999",
          },
        };





        
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } catch (error) {
        console.error(getError(error));
      }
    } else if (paymentMethod === "cashOnDelivery") {
      // handle cash on delivery payment
    }
  };



  return (
    <div className="payment-method-container">
      <h5>Select Payment Method</h5>
      <div className="payment-method-options">
        <label>
          <input
            type="radio"
            value="cashOnDelivery"
            checked={paymentMethod === "cashOnDelivery"}
            onChange={handlePaymentMethodChange}
          />
          <span className="checkmark"></span>
          Cash on Delivery
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="payOnline"
            checked={paymentMethod === "payOnline"}
            onChange={handlePaymentMethodChange}
          />
          <span className="checkmark"></span>
          Pay Online
        </label>
        <div></div>

        {paymentMethod === "payOnline" && (
          <form onSubmit={handleSubmit}>
            <label>
              <h4 className="p-3">Amount:</h4>
              <input
                type="text"
                value={cartSubtotal.toFixed(2)}
                onChange={handleAmountChange}
              />
            </label>
            <button
              id="razopay btn"
              className="btn m-5 theme-btn-1 btn-effect-1 text-uppercase"
              type="submit"
            >
              Place order
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default PaymentMethod;
