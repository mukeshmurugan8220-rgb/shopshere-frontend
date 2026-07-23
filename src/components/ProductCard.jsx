import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";


function ProductCard({product}){


  const {addToCart}=useCart();



  const getImageUrl = () => {


    if(product.image.includes("\\")){


      return (
        "http://localhost:5000/uploads/products/" +
        product.image.split("\\").pop()
      );


    }


    return (
      "http://localhost:5000" + product.image
    );


  };



  return(


    <div className="product-card">



      <div className="image-box">


        <img

          src={getImageUrl()}

          alt={product.name}

        />


      </div>




      <h2>
        {product.name}
      </h2>




      <p>
        {product.description}
      </p>




      <h3>
        ₹ {product.price}
      </h3>




      <button

        onClick={()=>addToCart(product)}

      >

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