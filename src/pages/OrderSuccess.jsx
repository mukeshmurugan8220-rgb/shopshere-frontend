import { Link } from "react-router-dom";

function OrderSuccess() {

  return (

    <div
      style={{
        textAlign: "center",
        marginTop: "100px"
      }}
    >

      <h1>🎉 Order Placed Successfully!</h1>

      <h2>Thank You For Shopping With ShopSphere ❤️</h2>

      <p>Your order will be delivered soon.</p>

      <Link to="/products">
        <button
          style={{
            marginTop: "20px",
            padding: "15px 30px"
          }}
        >
          Continue Shopping 🛒
        </button>
      </Link>

    </div>

  );

}

export default OrderSuccess;