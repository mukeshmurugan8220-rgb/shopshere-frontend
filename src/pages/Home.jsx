
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="welcome-title">
            <span className="welcome-text">
              Welcome to
            </span>{" "}
            <span className="shopsphere-title">
              ShopSphere
            </span>{" "}
            <span className="welcome-cart">🛒</span>
          </h1>

          <h2 className="hero-subtitle">
            Premium Gadget Shopping Experience
          </h2>

          <p className="hero-description">
            Discover the latest smartphones, laptops, and accessories
            at ShopSphere. Enjoy quality products, secure shopping,
            and a smooth shopping experience.
          </p>

          <Link to="/products" className="hero-btn">
            Explore Products →
          </Link>
        </div>
      </section>

      <section className="categories">
        <h2>Shop by Category</h2>

        <div className="category-container">
          <div className="category-card">
            <span>📱</span>
            <h3>Smartphones</h3>
            <Link to="/products">Explore Now</Link>
          </div>

          <div className="category-card">
            <span>💻</span>
            <h3>Laptops</h3>
            <Link to="/products">Explore Now</Link>
          </div>

          <div className="category-card">
            <span>🎧</span>
            <h3>Accessories</h3>
            <Link to="/products">Explore Now</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose ShopSphere?</h2>

        <div className="feature-container">
          <div className="feature-card">
            <span>🚚</span>
            <h3>Fast Delivery</h3>
            <p>Convenient delivery for your orders.</p>
          </div>

          <div className="feature-card">
            <span>🔒</span>
            <h3>Secure Shopping</h3>
            <p>A simple and secure shopping experience.</p>
          </div>

          <div className="feature-card">
            <span>⭐</span>
            <h3>Quality Products</h3>
            <p>Explore gadgets for your everyday needs.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
