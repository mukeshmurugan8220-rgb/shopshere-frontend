
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../api/axios";
import { useCart } from "../context/CartContext";

const BASE_URL = "https://shopsphere-backend-2-53ck.onrender.com";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      setProduct(null);
      setQuantity(1);

      try {
        const res = await API.get(`/products/${id}`);

        if (active) {
          setProduct(res.data.product);
        }
      } catch (err) {
        console.error("Product fetch failed:", err);

        if (active) {
          setError("Unable to load this product. Please try again.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      active = false;
    };
  }, [id]);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => setMessage(""), 2500);
    return () => clearTimeout(timer);
  }, [message]);

  if (loading) {
    return (
      <div className="product-details-status">
        <div className="product-details-loader" />
        <h2>Loading product...</h2>
        <p>Getting your favourite gadget ready ✨</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-status">
        <h2>😕 Product not found</h2>
        <p>{error || "This product may no longer be available."}</p>
        <Link to="/products" className="details-back-link">
          ← Back to Products
        </Link>
      </div>
    );
  }

  const imageUrl = !product.image
    ? "https://placehold.co/600x600?text=No+Image"
    : product.image.includes("\\")
    ? `${BASE_URL}/uploads/products/${product.image.split("\\").pop()}`
    : product.image.startsWith("/uploads")
    ? `${BASE_URL}${product.image}`
    : product.image;

  const stock = Math.max(0, Number(product.stock) || 0);
  const price = Number(product.price) || 0;
  const outOfStock = stock <= 0;

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => Math.min(stock, current + 1));
  };

  const handleAddToCart = () => {
    if (outOfStock) {
      setMessage("Sorry, this product is out of stock.");
      return;
    }

    // Add each selected unit using the existing cart context API.
    for (let i = 0; i < quantity; i += 1) {
      addToCart(product);
    }

    setMessage(
      `${quantity} ${quantity === 1 ? "item" : "items"} added to cart! 🛒`
    );
  };

  return (
    <main className="product-details-page">
      <div className="product-details-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <section className="product-details">
        <div className="product-details-image-wrap">
          <span className="product-details-badge">SHOPSPHERE PICK ✨</span>

          <img
            className="product-details-image"
            src={imageUrl}
            alt={product.name || "Product"}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src =
                "https://placehold.co/600x600?text=No+Image";
            }}
          />
        </div>

        <div className="product-details-info">
          <p className="product-details-eyebrow">
            PREMIUM GADGET COLLECTION
          </p>

          <h1>{product.name}</h1>

          <div className="product-details-rating">
            <span>★★★★★</span>
            <small>Discover your next favourite gadget</small>
          </div>

          <div className="product-details-price">
            ₹{price.toLocaleString("en-IN")}
          </div>

          <p className="product-details-description">
            {product.description ||
              "Discover quality technology and elevate your everyday experience with ShopSphere."}
          </p>

          <div className="product-details-divider" />

          <div className="product-details-meta">
            <div>
              <span>Category</span>
              <strong>{product.category || "General"}</strong>
            </div>

            <div>
              <span>Availability</span>
              <strong className={outOfStock ? "stock-out" : "stock-in"}>
                {outOfStock ? "Out of Stock" : "In Stock"}
              </strong>
            </div>

            <div>
              <span>Stock available</span>
              <strong>{stock} units</strong>
            </div>
          </div>

          <div className="product-details-divider" />

          <div className="product-details-purchase">
            <div className="quantity-selector">
              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span aria-live="polite">{quantity}</span>

              <button
                type="button"
                onClick={increaseQuantity}
                disabled={outOfStock || quantity >= stock}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="details-add-cart"
              onClick={handleAddToCart}
              disabled={outOfStock}
            >
              {outOfStock ? "Out of Stock" : "Add To Cart 🛒"}
            </button>
          </div>

          {message && (
            <div className="product-details-toast" role="status">
              {message}
            </div>
          )}

          <div className="product-details-perks">
            <div>
              <span>🚚</span>
              <p>
                <strong>Reliable Shopping</strong>
                <small>A smooth shopping experience</small>
              </p>
            </div>

            <div>
              <span>🔒</span>
              <p>
                <strong>Shop With Confidence</strong>
                <small>Your next gadget is just a click away</small>
              </p>
            </div>
          </div>

          <Link to="/products" className="details-back-link">
            ← Continue Shopping
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;
