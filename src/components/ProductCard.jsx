
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const BASE_URL = "https://shopsphere-backend-2-53ck.onrender.com";
const WISHLIST_KEY = "shopsphereWishlist";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const [isWishlisted, setIsWishlisted] = useState(() => {
    try {
      const wishlist = JSON.parse(
        localStorage.getItem(WISHLIST_KEY) || "[]"
      );

      return wishlist.some((item) => item._id === product._id);
    } catch {
      return false;
    }
  });

  const getImageUrl = () => {
    if (!product.image) {
      return "https://placehold.co/300x300?text=No+Image";
    }

    if (product.image.includes("\\")) {
      const filename = product.image.split("\\").pop();
      return `${BASE_URL}/uploads/products/${filename}`;
    }

    if (product.image.startsWith("/uploads")) {
      return `${BASE_URL}${product.image}`;
    }

    return product.image;
  };

  const toggleWishlist = () => {
    try {
      const wishlist = JSON.parse(
        localStorage.getItem(WISHLIST_KEY) || "[]"
      );

      const alreadyExists = wishlist.some(
        (item) => item._id === product._id
      );

      const updatedWishlist = alreadyExists
        ? wishlist.filter((item) => item._id !== product._id)
        : [...wishlist, product];

      localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(updatedWishlist)
      );

      setIsWishlisted(!alreadyExists);

      // Update Navbar wishlist count immediately
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (error) {
      console.error("Wishlist update failed:", error);
      alert("Wishlist update panna mudiyala. Please try again.");
    }
  };

  return (
    <div className="product-card">
      <div className="image-box">
        <img
          src={getImageUrl()}
          alt={product.name || "Product"}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src =
              "https://placehold.co/300x300?text=No+Image";
          }}
        />

        <button
          type="button"
          className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
          onClick={toggleWishlist}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          title={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      </div>

      <h2>{product.name}</h2>

      <p>{product.description || "Discover this amazing gadget."}</p>

      <h3>
        ₹ {Number(product.price || 0).toLocaleString("en-IN")}
      </h3>

      <button
        type="button"
        className="add-cart-btn"
        onClick={() => addToCart(product)}
      >
        Add To Cart 🛒
      </button>

      <Link
        to={`/product/${product._id}`}
        className="view-product-link"
      >
        <button type="button" className="view-btn">
          View Product 👀
        </button>
      </Link>
    </div>
  );
}

export default ProductCard;

