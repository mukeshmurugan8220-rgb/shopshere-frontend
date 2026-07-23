import { Link } from "react-router-dom";


function Home(){

  return(

    <div className="home">


      <section className="hero">


        <h1>
          Welcome To ShopSphere 🛒
        </h1>


        <h2>
          Premium Gadget Shopping Experience
        </h2>


        <p>
          Discover latest smartphones, laptops and smart gadgets
          with secure payment and fast delivery.
        </p>


        <Link to="/products">

          <button>
            Explore Products 🚀
          </button>

        </Link>


      </section>



      <section className="categories">


        <div>
          📱
          <h3>
            Smartphones
          </h3>
        </div>


        <div>
          💻
          <h3>
            Laptops
          </h3>
        </div>


        <div>
          🎧
          <h3>
            Accessories
          </h3>
        </div>


      </section>



      <section className="features">


        <div>

          <h2>
            🚚 Fast Delivery
          </h2>

          <p>
            Quick and safe delivery
          </p>

        </div>



        <div>

          <h2>
            🔒 Secure Payment
          </h2>

          <p>
            100% safe transactions
          </p>

        </div>



        <div>

          <h2>
            ⭐ Quality Products
          </h2>

          <p>
            Best gadgets for customers
          </p>

        </div>


      </section>


    </div>

  );

}


export default Home;