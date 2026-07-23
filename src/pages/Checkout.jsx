import { useNavigate } from "react-router-dom";

function Checkout() {

  const navigate = useNavigate();

  return (

    <div className="form-container">

      <h1>Checkout 💳</h1>

      <h3>Verify OTP before Payment</h3>

      <button
        onClick={() => navigate("/otp")}
      >
        Verify OTP
      </button>

    </div>

  );

}

export default Checkout;