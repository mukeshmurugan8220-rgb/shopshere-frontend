
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const BASE_URL = "https://shopsphere-backend-2-53ck.onrender.com";
const WISHLIST_KEY = "shopsphereWishlist";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [addedProduct, setAddedProduct] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const loadWishlist = () => {
      try {
        const saved = JSON.parse(
          localStorage.getItem(WISHLIST_KEY) || "[]"
        );

        setWishlist(Array.isArray(saved) ? saved : []);
      } catch (error) {
        console.error("Wishlist load failed:", error);
        setWishlist([]);
      }
    };

    loadWishlist();

    // Other components update pannumbodhu wishlist refresh aagum.
    window.addEventListener("wishlistUpdated", loadWishlist);
    window.addEventListener("storage", loadWishlist);

    return () => {
      window.removeEventListener("wishlistUpdated", loadWishlist);
      window.removeEventListener("storage", loadWishlist);
    };
  }, []);

  useEffect(() => {
    if (!addedProduct) return;

    const timer = setTimeout(() => setAddedProduct(""), 2000);
    return () => clearTimeout(timer);
  }, [addedProduct]);

  const getImageUrl = (product) => {
    const image = product.image;

    if (!image) {
      return "https://placehold.co/400x400?text=No+Image";
    }

    if (image.includes("\\")) {
      return `${BASE_URL}/uploads/products/${image.split("\\").pop()}`;
    }

    if (image.startsWith("/uploads")) {
      return `${BASE_URL}${image}`;
    }

    return image;
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(
      (product) => product._id !== productId
    );

    try {
      localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(updatedWishlist)
      );

      setWishlist(updatedWishlist);
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (error) {
      console.error("Wishlist update failed:", error);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProduct(product._id);
  };

  return (
    <main className="shop-wishlist-page">
      <section className="shop-wishlist-hero">
        <div className="shop-wishlist-heart">♥</div>

        <div className="shop-wishlist-heading">
          <p className="shop-wishlist-eyebrow">YOUR PERSONAL COLLECTION</p>
          <h1>My Wishlist <span>❤️</span></h1>
          <p>Keep the gadgets you love, all in one place.</p>
        </div>

        <div className="shop-wishlist-count">
          <strong>{wishlist.length}</strong>
          <span>{wishlist.length === 1 ? "Saved item" : "Saved items"}</span>
        </div>
      </section>

      {wishlist.length === 0 ? (
        <section className="shop-wishlist-empty">
          <div className="shop-wishlist-empty-icon">💔</div>

          <h2>Your wishlist is waiting!</h2>

          <p>
            You haven't saved any gadgets yet. Explore our collection
            and save your favourites here.
          </p>

          <Link to="/products" className="shop-wishlist-shop-btn">
            Explore Products <span>→</span>
          </Link>
        </section>
      ) : (
        <>
          <div className="shop-wishlist-toolbar">
            <div>
              <h2>Your Favourite Gadgets</h2>
              <p>Saved for whenever you're ready.</p>
            </div>

            <Link to="/products" className="shop-wishlist-continue">
              + Discover More
            </Link>
          </div>

          <div className="shop-wishlist-grid">
            {wishlist.map((product) => (
              <article
                className="shop-wishlist-card"
                key={product._id}
              >
                <div className="shop-wishlist-image-wrap">
                  <Link
                    to={`/product/${product._id}`}
                    className="shop-wishlist-image-link"
                    aria-label={`View ${product.name}`}
                  >
                    <img
                      src={getImageUrl(product)}
                      alt={product.name || "Product"}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src =
                          "https://placehold.co/400x400?text=No+Image";
                      }}
                    />
                  </Link>

                  <span className="shop-wishlist-saved-badge">
                    ♥ SAVED
                  </span>

                  <button
                    type="button"
                    className="shop-wishlist-remove-icon"
                    onClick={() => removeFromWishlist(product._id)}
                    aria-label={`Remove ${product.name} from wishlist`}
                    title="Remove from wishlist"
                  >
                    ♥
                  </button>
                </div>

                <div className="shop-wishlist-card-content">
                  <p className="shop-wishlist-category">
                    {product.category || "PREMIUM GADGET"}
                  </p>

                  <Link
                    to={`/product/${product._id}`}
                    className="shop-wishlist-product-link"
                  >
                    <h3>{product.name || "Product"}</h3>
                  </Link>

                  <p className="shop-wishlist-description">
                    {product.description ||
                      "Discover your next favourite gadget."}
                  </p>

                  <div className="shop-wishlist-card-footer">
                    <strong className="shop-wishlist-price">
                      ₹{Number(product.price || 0).toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <button
                    type="button"
                    className={`shop-wishlist-cart-btn ${
                      addedProduct === product._id ? "added" : ""
                    }`}
                    onClick={() => handleAddToCart(product)}
                  >
                    {addedProduct === product._id
                      ? "✓ Added to Cart"
                      : "🛒 Add to Cart"}
                  </button>

                  <button
                    type="button"
                    className="shop-wishlist-remove-btn"
                    onClick={() => removeFromWishlist(product._id)}
                  >
                    Remove from Wishlist
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default Wishlist;

