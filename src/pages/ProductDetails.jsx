import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { useCart } from "../context/CartContext";

function ProductDetails() {

  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

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

  const imageUrl = product.image.includes("\\")
    ? "http://localhost:5000/uploads/products/" +
      product.image.split("\\").pop()
    : "http://localhost:5000" + product.image;

  return (
    <div className="product-details">
      <img src={imageUrl} alt={product.name} />

      <div>
        <h1>{product.name}</h1>
        <h2>₹ {product.price}</h2>
        <h3>Category : {product.category}</h3>
        <h3>Stock : {product.stock}</h3>

        <p>{product.description}</p>

        <button onClick={() => addToCart(product)}>
          Add To Cart 🛒
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;