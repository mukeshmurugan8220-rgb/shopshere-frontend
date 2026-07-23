import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UpiPayment() {

  const navigate = useNavigate();

  const [upiId, setUpiId] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const sendOtp = () => {

    if (upiId === "") {
      alert("Enter UPI ID");
      return;
    }

    alert("OTP Sent Successfully 📲");
    setShowOtp(true);

  };

  const verifyOtp = () => {

    if (otp === "123456") {

      alert("Payment Successful ✅");
      navigate("/");

    } else {

      alert("Invalid OTP ❌");

    }

  };

  return (

    <div className="form-container">

      <h1>UPI Payment 💰</h1>

      <input
        type="text"
        placeholder="Enter UPI ID"
        value={upiId}
        onChange={(e)=>setUpiId(e.target.value)}
      />

      {

        !showOtp ?

        <button onClick={sendOtp}>
          Send OTP
        </button>

        :

        <>

          <input
            type="text"
            placeholder="Enter OTP (123456)"
            value={otp}
            onChange={(e)=>setOtp(e.target.value)}
          />

          <button onClick={verifyOtp}>
            Verify & Pay
          </button>

        </>

      }

    </div>

  );

}

export default UpiPayment;