import { useNavigate } from "react-router-dom";

function Payment() {

  const navigate = useNavigate();

  const paymentSuccess = () => {

    alert("Payment Successful ✅");
    navigate("/success");

  };

  return (

    <div className="form-container">

      <h1>Payment 💳</h1>

      <button onClick={paymentSuccess}>
        UPI
      </button>

      <button
        style={{marginTop:"15px"}}
        onClick={paymentSuccess}
      >
        Credit / Debit Card
      </button>

      <button
        style={{marginTop:"15px"}}
        onClick={paymentSuccess}
      >
        Cash On Delivery
      </button>

    </div>

  );

}

export default Payment;