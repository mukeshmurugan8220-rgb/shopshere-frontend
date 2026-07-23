import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CardPayment() {

  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const payNow = (e) => {

    e.preventDefault();

    if (
      !cardNumber ||
      !name ||
      !expiry ||
      !cvv
    ) {
      alert("Please fill all fields");
      return;
    }

    alert("Payment Successful ✅");
    navigate("/success");

  };

  return (

    <div className="form-container">

      <h1>💳 Card Payment</h1>

      <form onSubmit={payNow}>

        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e)=>setCardNumber(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Card Holder Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="MM/YY"
          value={expiry}
          onChange={(e)=>setExpiry(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="CVV"
          value={cvv}
          onChange={(e)=>setCvv(e.target.value)}
          required
        />

        <button type="submit">
          Pay Now 💳
        </button>

      </form>

    </div>

  );

}

export default CardPayment;