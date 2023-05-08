import axios from "axios";
import { useSession, getSession } from "next-auth/react";
import { useState } from "react";
import { redirect } from "next/dist/server/api-utils";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

function VerifyOTP() {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [message, setMessage] = useState("");

  const { data: session, status } = useSession();
  const router=useRouter()

 

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.push('/Emailverify')
  
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/user/verify", { email, otp });
      setMessage(response.data.message);
      if(response.status==200){
        Swal.fire({
          icon: 'success',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
        router.push('/login')
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Invalid Email or OTP')
    }
  };

  return (
    <div>
     


      <div className="container mt-5">
     <div className="ltn__form-box contact-form-box box-shadow white-bg ml-0">
  <h4 className="title-2">Verify Your Account</h4>
  <form onSubmit={handleSubmit}>
    <div className="col-12">
      <div className="row">
        <div className="col-12">
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        </div>
        <div className="col-12">
        <label>
          OTP:
          <input 
            type="text" maxLength={4}
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            required
          />
        </label>
        </div>
        <div className="col-12">
        <button type="submit" className="btn btn-success">Verify OTP</button>
        </div>
      </div>
    </div>
       
      </form>
      {message && <p>{message}</p>}
</div>

      </div>
    </div>
  );
}

export default VerifyOTP;
