import { createContext, useContext, useState } from "react";


const CartContext = createContext();



export function CartProvider({children}){


  const [cart,setCart] = useState([]);



  const addToCart = (product)=>{


    setCart((prev)=>{


      const existing = prev.find(

        item => item._id === product._id

      );



      if(existing){


        return prev.map(item=>


          item._id === product._id

          ?

          {

            ...item,

            quantity:item.quantity + 1

          }


          :

          item


        );


      }



      return [

        ...prev,

        {

          ...product,

          quantity:1

        }

      ];


    });


  };



  return(


    <CartContext.Provider

      value={{

        cart,

        setCart,

        addToCart

      }}

    >

      {children}

    </CartContext.Provider>


  );


}



export function useCart(){

  return useContext(CartContext);

}