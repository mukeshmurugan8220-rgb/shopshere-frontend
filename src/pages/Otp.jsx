import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Otp() {

  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const verifyOtp = () => {

    if (otp === "123456") {

      alert("OTP Verified Successfully ✅");

      navigate("/payment");

    } else {

      alert("Invalid OTP ❌");

    }

  };

  return (

    <div className="form-container">

      <h1>OTP Verification 🔐</h1>

      <p>
        Demo OTP : <b>123456</b>
      </p>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={verifyOtp}>
        Verify OTP
      </button>

    </div>

  );

}

export default Otp;