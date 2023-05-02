import axios from "axios";
import { useRouter } from 'next/router'
import { useSession, getSession } from "next-auth/react";
import { useState } from "react";
import { redirect } from "next/dist/server/api-utils";

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
      router.push('/login')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
     


      <div className="container mt-5">
     <div className="ltn__form-box contact-form-box box-shadow white-bg">
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
      </div>
    </div>
        <button type="submit">Verify OTP</button>
      </form>
      {message && <p>{message}</p>}
</div>

      </div>
    </div>
  );
}

export default VerifyOTP;
