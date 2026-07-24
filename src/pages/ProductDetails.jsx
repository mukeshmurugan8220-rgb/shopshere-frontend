import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { useCart } from "../context/CartContext";

const BASE_URL = "https://shopsphere-backend-2-53ck.onrender.com";

function ProductDetails() {

  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data.product);
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  const imageUrl = !product.image
    ? "https://via.placeholder.com/400x400?text=No+Image"
    : product.image.includes("\\")
    ? `${BASE_URL}/uploads/products/${product.image.split("\\").pop()}`
    : product.image.startsWith("/uploads")
    ? `${BASE_URL}${product.image}`
    : product.image;

  return (
    <div className="product-details">

      <img
        src={imageUrl}
        alt={product.name}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
        }}
      />

      <div>

        <h1>{product.name}</h1>

        <h2>₹ {product.price}</h2>

        <h3>Category: {product.category}</h3>

        <h3>Stock: {product.stock}</h3>

        <p>{product.description}</p>

        <button onClick={() => addToCart(product)}>
          Add To Cart 🛒
        </button>

      </div>

    </div>
  );
}

export default ProductDetails;