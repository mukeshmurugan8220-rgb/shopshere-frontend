
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";

function Checkout() {
  const navigate = useNavigate();
  const { cart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [error, setError] = useState("");

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setError("Your cart is empty. Please add products before checkout.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      setError("Please enter a valid 6-digit PIN code.");
      return;
    }

    sessionStorage.setItem(
      "shopsphereCheckoutDetails",
      JSON.stringify(formData)
    );

    navigate("/otp");
  };

  return (
    <div className="shop-checkout-page">
      <div className="shop-checkout-header">
        <span className="shop-checkout-tag">🛍️ SHOPSPHERE CHECKOUT</span>
        <h1>Complete Your Order</h1>
        <p>Just a few details before your gadgets reach you.</p>

        <div className="shop-checkout-steps">
          <span className="active">1. Delivery Details</span>
          <span>2. OTP Verification</span>
          <span>3. Payment</span>
        </div>
      </div>

      <div className="shop-checkout-layout">
        <form className="shop-checkout-form" onSubmit={handleSubmit}>
          <div className="shop-checkout-section-heading">
            <span>📦</span>
            <div>
              <h2>Delivery Information</h2>
              <p>Enter the details for your delivery.</p>
            </div>
          </div>

          {error && <div className="shop-checkout-error">{error}</div>}

          <div className="shop-checkout-fields">
            <div className="shop-checkout-field">
              <label htmlFor="fullName">Full Name *</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>

            <div className="shop-checkout-field">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="shop-checkout-field">
              <label htmlFor="phone">Mobile Number *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
                required
              />
            </div>

            <div className="shop-checkout-field shop-checkout-full">
              <label htmlFor="address">Delivery Address *</label>
              <textarea
                id="address"
                name="address"
                placeholder="House number, street, area"
                value={formData.address}
                onChange={handleChange}
                autoComplete="street-address"
                rows={3}
                required
              />
            </div>

            <div className="shop-checkout-field">
              <label htmlFor="city">City *</label>
              <input
                id="city"
                name="city"
                type="text"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
                autoComplete="address-level2"
                required
              />
            </div>

            <div className="shop-checkout-field">
              <label htmlFor="pincode">PIN Code *</label>
              <input
                id="pincode"
                name="pincode"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="6-digit PIN code"
                value={formData.pincode}
                onChange={handleChange}
                autoComplete="postal-code"
                required
              />
            </div>
          </div>

          <div className="shop-checkout-security">
            🔒 Your checkout details will be used to process your order.
          </div>

          <button type="submit" className="shop-checkout-submit">
            Continue to OTP Verification →
          </button>

          <Link to="/cart" className="shop-checkout-back">
            ← Return to Cart
          </Link>
        </form>

        <aside className="shop-checkout-summary">
          <h2>Order Summary</h2>
          <p className="shop-checkout-summary-subtitle">
            {cart.length} product(s) in your cart
          </p>

          {cart.length === 0 ? (
            <div className="shop-checkout-empty">
              <span>🛒</span>
              <p>Your cart is empty.</p>
              <Link to="/products">Explore Products</Link>
            </div>
          ) : (
            <>
              <div className="shop-checkout-products">
                {cart.map((item, index) => (
                  <div
                    className="shop-checkout-product"
                    key={item._id || item.id || index}
                  >
                    <div className="shop-checkout-product-info">
                      <h3>{item.name || item.title || "Product"}</h3>
                      <p>Qty: {item.quantity || 1}</p>
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

              <div className="shop-checkout-price-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <div className="shop-checkout-price-row">
                <span>Delivery</span>
                <span className="shop-checkout-free">FREE</span>
              </div>

              <div className="shop-checkout-total">
                <span>Total Amount</span>
                <strong>₹{total.toLocaleString("en-IN")}</strong>
              </div>

              <div className="shop-checkout-benefits">
                <p>🚚 Delivery details collected securely</p>
                <p>📱 OTP verification before proceeding</p>
                <p>💳 Payment handled in the next step</p>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

export default Checkout;

