
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function COD() {
  const navigate = useNavigate();
  const { cart } = useCart();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setError("");

    if (!cart.length) {
      setError("Your cart is empty. Please add products before ordering.");
      return;
    }

    if (address.trim().length < 10) {
      setError("Please enter your complete delivery address.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    const orderDetails = {
      items: cart,
      deliveryAddress: address.trim(),
      phone,
      paymentMethod: "Cash on Delivery",
      subtotal,
      total: subtotal,
      orderDate: new Date().toISOString(),
      paymentStatus: "Pending — Pay on Delivery",
    };

    sessionStorage.setItem(
      "shopsphereCODOrder",
      JSON.stringify(orderDetails)
    );

    sessionStorage.setItem(
      "shopspherePaymentMethod",
      "Cash on Delivery"
    );

    navigate("/success", {
      state: {
        paymentMethod: "Cash on Delivery",
        paymentStatus: "Pending — Pay on Delivery",
      },
    });
  };

  return (
    <div className="shop-cod-page">
      <header className="shop-cod-header">
        <span className="shop-cod-badge">📦 SHOPSPHERE DELIVERY</span>
        <h1>Cash on Delivery</h1>
        <p>Pay for your order when it arrives at your doorstep.</p>
      </header>

      <div className="shop-cod-layout">
        <form className="shop-cod-form" onSubmit={handlePlaceOrder}>
          <div className="shop-cod-section-title">
            <span>🏠</span>
            <div>
              <h2>Delivery Details</h2>
              <p>Where should we deliver your order?</p>
            </div>
          </div>

          {error && (
            <div className="shop-cod-error" role="alert">
              ⚠️ {error}
            </div>
          )}

          <div className="shop-cod-field">
            <label htmlFor="cod-phone">Mobile Number *</label>
            <input
              id="cod-phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              autoComplete="tel"
              placeholder="Enter your 10-digit mobile number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                setError("");
              }}
              required
            />
          </div>

          <div className="shop-cod-field">
            <label htmlFor="cod-address">Complete Delivery Address *</label>
            <textarea
              id="cod-address"
              rows={5}
              placeholder="House number, street, area, city, state and PIN code"
              autoComplete="street-address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setError("");
              }}
              required
            />
            <small>Enter enough details so your order can reach you.</small>
          </div>

          <div className="shop-cod-note">
            <span>💵</span>
            <p>
              <strong>Pay when delivered.</strong>
              <br />
              Payment is due when your package arrives. No online payment is
              taken on this page.
            </p>
          </div>

          <button type="submit" className="shop-cod-submit">
            Confirm COD Order →
          </button>

          <Link to="/cart" className="shop-cod-back">
            ← Return to Cart
          </Link>
        </form>

        <aside className="shop-cod-summary">
          <h2>Order Summary</h2>
          <p className="shop-cod-muted">
            {cart.length} product(s) in your cart
          </p>

          {!cart.length ? (
            <div className="shop-cod-empty">
              <span>🛒</span>
              <p>Your cart is empty.</p>
              <Link to="/products">Explore Products</Link>
            </div>
          ) : (
            <>
              <div className="shop-cod-items">
                {cart.map((item, index) => (
                  <div
                    className="shop-cod-item"
                    key={item._id || item.id || index}
                  >
                    <div>
                      <h3>{item.name || item.title || "Product"}</h3>
                      <p>Quantity: {item.quantity || 1}</p>
                    </div>

                    <strong>
                      ₹
                      {(
                        Number(item.price || 0) *
                        Number(item.quantity || 1)
                      ).toLocaleString("en-IN")}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="shop-cod-total">
                <span>Total payable on delivery</span>
                <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
              </div>

              <div className="shop-cod-delivery">
                🚚 Delivery charges and availability should be confirmed
                before the order is processed.
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

export default COD;

