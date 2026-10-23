
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import "./Navbar.css";

const WISHLIST_KEY = "shopsphereWishlist";

function Navbar() {
  const { cart } = useCart();
  const location = useLocation();

  const [wishlistCount, setWishlistCount] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem(WISHLIST_KEY) || "[]"
      ).length;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    const updateWishlistCount = () => {
      try {
        const wishlist = JSON.parse(
          localStorage.getItem(WISHLIST_KEY) || "[]"
        );

        setWishlistCount(wishlist.length);
      } catch {
        setWishlistCount(0);
      }
    };

    updateWishlistCount();

    window.addEventListener(
      "wishlistUpdated",
      updateWishlistCount
    );

    return () => {
      window.removeEventListener(
        "wishlistUpdated",
        updateWishlistCount
      );
    };
  }, [location.pathname]);

  return (
    <nav className="navbar">
      {/* Animated ShopSphere Logo */}
      <Link to="/" className="logo shopsphere-logo">
        <span className="logo-icon">🛒</span>
        <span className="logo-text">ShopSphere</span>
      </Link>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        <Link to="/wishlist">
          ❤️ Wishlist
          <span className="cart-count">
            {wishlistCount}
          </span>
        </Link>

        <Link to="/login">Login</Link>

        <Link to="/register">Register</Link>

        <Link to="/admin/add-product">
          Add Product
        </Link>

        <Link to="/cart">
          Cart 🛒
          <span className="cart-count">
            {cart.length}
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

