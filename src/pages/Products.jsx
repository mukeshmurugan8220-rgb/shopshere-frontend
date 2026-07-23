import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";


function Products(){

  const [products,setProducts] = useState([]);


  useEffect(()=>{

    getProducts();

  },[]);



  const getProducts = async()=>{

    try{

      const res = await API.get("/products");

      setProducts(res.data.products);

    }
    catch(error){

      console.log(error);

    }

  };



  return(

    <div className="products-page">


      <h1>
        Latest Gadgets 🛒
      </h1>



      <div className="products">


      {
        products.map((product)=>(

          <ProductCard

            key={product._id}

            product={product}

          />

        ))
      }


      </div>


    </div>

  );

}


export default Products;