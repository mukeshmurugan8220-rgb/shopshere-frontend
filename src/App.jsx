import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminAddProduct from "./pages/AdminAddProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import OrderSuccess from "./pages/OrderSuccess";
import UpiPayment from "./pages/UpiPayment";
import CardPayment from "./pages/CardPayment";
import COD from "./pages/COD";
import Otp from "./pages/Otp";
import Payment from "./pages/Payment";
import Wishlist from "./pages/Wishlist";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/admin/add-product"
          element={<AdminAddProduct />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/success"
          element={<OrderSuccess />}
        />

        <Route
          path="/upi"
          element={<UpiPayment />}
        />

        <Route
          path="/card"
          element={<CardPayment />}
        />

        <Route
          path="/cod"
          element={<COD />}
        />
        <Route
          path="/otp"
          element={<Otp />}
        />

        <Route
          path="/payment"
          element={<Payment />}
         />
         
         <Route
            path="/wishlist"
            element={<Wishlist />}
         />

      </Routes>

    </BrowserRouter>

  );

}

export default App;