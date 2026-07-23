import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";


function Navbar(){


  const {cart}=useCart();



  return(

    <nav className="navbar">


      <h1 className="logo">
        🛒 ShopSphere
      </h1>



      <div className="nav-links">


        <Link to="/">
          Home
        </Link>


        <Link to="/products">
          Products
        </Link>


        <Link to="/login">
          Login
        </Link>


        <Link to="/register">
          Register
        </Link>


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