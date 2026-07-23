import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {

  const { cart, setCart } = useCart();

  const removeItem = (index) => {

    setCart(
      cart.filter((_, i) => i !== index)
    );

  };

  const total = cart.reduce(

    (sum, item) =>

      sum + (item.price * (item.quantity || 1)),

    0

  );

  return (

    <div className="cart-page">

      <h1>My Cart 🛒</h1>

      {

        cart.length === 0 ?

          <h2>Cart is Empty 😔</h2>

          :

          <>

            {

              cart.map((item, index) => (

                <div
                  className="cart-card"
                  key={index}
                >

                  <img

                    src={
                      item.image.includes("\\")
                        ?
                        "http://localhost:5000/uploads/products/" +
                        item.image.split("\\").pop()
                        :
                        "http://localhost:5000" + item.image
                    }

                    alt={item.name}

                  />

                  <div>

                    <h2>{item.name}</h2>

                    <h3>₹ {item.price}</h3>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        margin: "15px 0"
                      }}
                    >

                      <button

                        onClick={() => {

                          setCart(

                            cart.map((p, i) =>

                              i === index && (p.quantity || 1) > 1

                                ?

                                {
                                  ...p,
                                  quantity: p.quantity - 1
                                }

                                :

                                p

                            )

                          );

                        }}

                      >

                        -

                      </button>

                      <span>{item.quantity || 1}</span>

                      <button

                        onClick={() => {

                          setCart(

                            cart.map((p, i) =>

                              i === index

                                ?

                                {
                                  ...p,
                                  quantity: (p.quantity || 1) + 1
                                }

                                :

                                p

                            )

                          );

                        }}

                      >

                        +

                      </button>

                    </div>

                    <button
                      onClick={() => removeItem(index)}
                    >
                      Remove ❌
                    </button>

                  </div>

                </div>

              ))

            }

            <div
              style={{
                marginTop: "30px",
                textAlign: "center"
              }}
            >

              <h2
                style={{
                  marginBottom: "20px"
                }}
              >
                Total : ₹ {total}
              </h2>

              <Link to="/checkout">

                <button className="checkout-btn">

                  Proceed To Checkout 💳

                </button>

              </Link>

            </div>

          </>

      }

    </div>

  );

}

export default Cart;