import React, { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "../Contexts/userContext";
import {cartHandler, deleteItem} from "../controllers/cartHandler";


const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const {userInfo} = useContext(UserContext);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (userInfo) {
      setCart(userInfo.cart);
    }
  }, [userInfo]);

  const addToCart = async (product) => {
    if (!cart.includes(product)){ 
      const res = await cartHandler({product:product, userId:userInfo._id, qty:1});
      console.log(res);
      setCart((prevCart) => [...prevCart, {products:product, qty:1}]);
      console.log(cart);
    }
  };

  const removeFromCart = async (product) => {
    const res = deleteItem({product:product, userId:userInfo._id, qty:1});
    setCart((prevCart) => prevCart.filter((item) => item.products !== product));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce((total, item) => total + item.products.price, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
