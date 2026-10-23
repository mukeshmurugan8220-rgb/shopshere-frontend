
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const BASE_URL = "https://shopsphere-backend-2-53ck.onrender.com";

function Cart() {
  const { cart, setCart } = useCart();

  const getImageUrl = (image) => {
    if (!image) {
      return "https://placehold.co/300x300?text=No+Image";
    }

    if (image.includes("\\")) {
      return `${BASE_URL}/uploads/products/${image.split("\\").pop()}`;
    }

    if (image.startsWith("/uploads")) {
      return `${BASE_URL}${image}`;
    }

    return image;
  };

  const updateQuantity = (index, change) => {
    setCart((currentCart) =>
      currentCart.map((item, i) => {
        if (i !== index) return item;

        const quantity = Math.max(
          1,
          (Number(item.quantity) || 1) + change
        );

        return { ...item, quantity };
      })
    );
  };

  const removeItem = (index) => {
    setCart((currentCart) =>
      currentCart.filter((_, i) => i !== index)
    );
  };

  const total = cart.reduce(
    (sum, item) =>
      sum +
      (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + (Number(item.quantity) || 1),
    0
  );

  return (
    <main className="shop-cart-page">
      <div className="shop-cart-heading">
        <div>
          <p className="shop-cart-eyebrow">YOUR SHOPPING BAG</p>
          <h1>My Cart <span>🛒</span></h1>
          <p className="shop-cart-subtitle">
            Your favourite gadgets are waiting for you.
          </p>
        </div>

        <div className="shop-cart-count">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </div>
      </div>

      {cart.length === 0 ? (
        <section className="shop-cart-empty">
          <div className="shop-cart-empty-icon">🛍️</div>
          <h2>Your cart is empty</h2>
          <p>
            Looks like you haven't added any gadgets to your cart yet.
          </p>

          <Link to="/products" className="shop-cart-shop-btn">
            Explore Products →
          </Link>
        </section>
      ) : (
        <div className="shop-cart-layout">
          <section className="shop-cart-items">
            <div className="shop-cart-items-heading">
              <h2>Cart Items</h2>
              <span>{totalItems} items selected</span>
            </div>

            {cart.map((item, index) => {
              const quantity = Number(item.quantity) || 1;
              const price = Number(item.price) || 0;

              return (
                <article
                  className="shop-cart-card"
                  key={item._id || `${item.name}-${index}`}
                >
                  <div className="shop-cart-image-wrap">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.name || "Product"}
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src =
                          "https://placehold.co/300x300?text=No+Image";
                      }}
                    />
                  </div>

                  <div className="shop-cart-product-info">
                    <h3>{item.name || "Product"}</h3>

                    <p className="shop-cart-category">
                      {item.category || "Premium Gadget"}
                    </p>

                    <p className="shop-cart-unit-price">
                      ₹{price.toLocaleString("en-IN")} <span>/ item</span>
                    </p>

                    <div className="shop-cart-card-bottom">
                      <div className="shop-cart-quantity">
                        <button
                          type="button"
                          onClick={() => updateQuantity(index, -1)}
                          disabled={quantity <= 1}
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          −
                        </button>

                        <span aria-live="polite">{quantity}</span>

                        <button
                          type="button"
                          onClick={() => updateQuantity(index, 1)}
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="shop-cart-remove"
                        onClick={() => removeItem(index)}
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  </div>

                  <div className="shop-cart-line-total">
                    <span>Subtotal</span>
                    <strong>
                      ₹{(price * quantity).toLocaleString("en-IN")}
                    </strong>
                  </div>
                </article>
              );
            })}

            <Link to="/products" className="shop-cart-continue">
              ← Continue Shopping
            </Link>
          </section>

          <aside className="shop-cart-summary">
            <h2>Order Summary</h2>

            <div className="shop-cart-summary-row">
              <span>Total items</span>
              <span>{totalItems}</span>
            </div>

            <div className="shop-cart-summary-row">
              <span>Subtotal</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>

            <div className="shop-cart-summary-row">
              <span>Shipping</span>
              <span className="shop-cart-free">FREE*</span>
            </div>

            <p className="shop-cart-shipping-note">
              *Confirm shipping charges during checkout.
            </p>

            <div className="shop-cart-summary-divider" />

            <div className="shop-cart-total-row">
              <span>Total</span>
              <strong>₹{total.toLocaleString("en-IN")}</strong>
            </div>

            <Link to="/checkout" className="shop-cart-checkout-btn">
              Proceed To Checkout <span>→</span>
            </Link>

            <div className="shop-cart-secure">
              <span>🔒</span>
              <p>
                <strong>Ready for checkout</strong>
                <small>Review your order before payment.</small>
              </p>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Cart;

