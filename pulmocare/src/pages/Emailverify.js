import axios from "axios";

import { useSession, getSession } from "next-auth/react";
import { useState } from "react";
function VerifyOTP() {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [message, setMessage] = useState("");

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/user/verify", { email, otp });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          OTP:
          <input
            type="text"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            required
          />
        </label>
        <button type="submit">Verify OTP</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default VerifyOTP;
