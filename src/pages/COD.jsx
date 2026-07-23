import { useState } from "react";
import { useNavigate } from "react-router-dom";

function COD() {

  const navigate = useNavigate();

  const [address, setAddress] = useState("");

  const placeOrder = (e) => {

    e.preventDefault();

    if (!address) {
      alert("Enter Delivery Address");
      return;
    }

    alert("Order Placed Successfully 🎉");
    navigate("/success");

  };

  return (

    <div className="form-container">

      <h1>🚚 Cash On Delivery</h1>

      <form onSubmit={placeOrder}>

        <textarea
          rows="5"
          placeholder="Enter Delivery Address"
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
          style={{
            width:"100%",
            padding:"15px",
            marginTop:"15px",
            borderRadius:"10px"
          }}
        />

        <button type="submit">
          Place Order
        </button>

      </form>

    </div>

  );

}

export default COD;