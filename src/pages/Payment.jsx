
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const [error, setError] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();
    setError("");

    const checkoutDetails = sessionStorage.getItem(
      "shopsphereCheckoutDetails"
    );

    if (!checkoutDetails) {
      setError("Please complete your delivery details first.");
      return;
    }

    if (paymentMethod === "cod") {
      sessionStorage.setItem(
        "shopspherePaymentMethod",
        "Cash on Delivery"
      );

      navigate("/success", {
        state: {
          paymentMethod: "Cash on Delivery",
          paymentStatus: "Order placed — payment due on delivery",
        },
      });

      return;
    }

    setError(
      "Online payment is not connected yet. Please integrate a payment gateway to complete your payment securely."
    );
  };

  return (
    <div className="shop-payment-page">
      <div className="shop-payment-header">
        <span className="shop-payment-badge">🔒 SECURE CHECKOUT</span>
        <h1>Choose Your Payment</h1>
        <p>Select your preferred payment method for ShopSphere.</p>
      </div>

      <div className="shop-payment-layout">
        <form className="shop-payment-card" onSubmit={handlePayment}>
          <h2>Payment Methods</h2>
          <p className="shop-payment-subtitle">
            Choose how you would like to pay.
          </p>

          {error && (
            <div className="shop-payment-error" role="alert">
              ⚠️ {error}
            </div>
          )}

          <label
            className={`shop-payment-option ${
              paymentMethod === "upi" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={() => {
                setPaymentMethod("upi");
                setError("");
              }}
            />

            <span className="shop-payment-icon">📱</span>

            <span className="shop-payment-option-text">
              <strong>UPI Payment</strong>
              <small>Google Pay, PhonePe, Paytm</small>
            </span>

            <span className="shop-payment-radio" />
          </label>

          <label
            className={`shop-payment-option ${
              paymentMethod === "card" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => {
                setPaymentMethod("card");
                setError("");
              }}
            />

            <span className="shop-payment-icon">💳</span>

            <span className="shop-payment-option-text">
              <strong>Credit / Debit Card</strong>
              <small>Visa, Mastercard and other supported cards</small>
            </span>

            <span className="shop-payment-radio" />
          </label>

          <label
            className={`shop-payment-option ${
              paymentMethod === "cod" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => {
                setPaymentMethod("cod");
                setError("");
              }}
            />

            <span className="shop-payment-icon">📦</span>

            <span className="shop-payment-option-text">
              <strong>Cash on Delivery</strong>
              <small>Pay when your order arrives</small>
            </span>

            <span className="shop-payment-radio" />
          </label>

          <div className="shop-payment-security">
            🛡️ Never share your OTP, UPI PIN, or card PIN with anyone.
          </div>

          <button type="submit" className="shop-payment-submit">
            {paymentMethod === "cod"
              ? "Place COD Order →"
              : "Continue to Secure Payment →"}
          </button>

          <Link to="/cart" className="shop-payment-back">
            ← Return to Cart
          </Link>
        </form>

        <aside className="shop-payment-info">
          <div className="shop-payment-info-icon">🛍️</div>
          <h2>Shop with Confidence</h2>
          <p>
            Complete your order using the payment options supported by
            ShopSphere.
          </p>

          <div className="shop-payment-feature">
            <span>🔐</span>
            <div>
              <strong>Secure Checkout</strong>
              <p>Protect your payment information.</p>
            </div>
          </div>

          <div className="shop-payment-feature">
            <span>📦</span>
            <div>
              <strong>Convenient Delivery</strong>
              <p>Review your delivery details before ordering.</p>
            </div>
          </div>

          <div className="shop-payment-feature">
            <span>💬</span>
            <div>
              <strong>Order Assistance</strong>
              <p>Keep your order details available for reference.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Payment;

