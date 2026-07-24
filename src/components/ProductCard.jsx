import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const BASE_URL = "https://shopsphere-backend-2-53ck.onrender.com";

function ProductCard({ product }) {

  const { addToCart } = useCart();

  const getImageUrl = () => {

    if (!product.image) {
      return "https://via.placeholder.com/300x300?text=No+Image";
    }

    // Old Windows Path
    if (product.image.includes("\\")) {
      return `${BASE_URL}/uploads/products/${product.image.split("\\").pop()}`;
    }

    // Render Uploads
    if (product.image.startsWith("/uploads")) {
      return `${BASE_URL}${product.image}`;
    }

    // Already Full URL
    return product.image;

  };

  return (

    <div className="product-card">

      <div className="image-box">

        <img
          src={getImageUrl()}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            console.log("Image Error:", e.target.src);
            e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
          }}
        />

      </div>

      <h2>{product.name}</h2>

      <p>{product.description}</p>

      <h3>₹ {product.price}</h3>

      <button onClick={() => addToCart(product)}>
        Add To Cart 🛒
      </button>

      <Link to={`/product/${product._id}`}>
        <button className="view-btn">
          View Product 👀
        </button>
      </Link>

    </div>

  );

}

export default ProductCard;