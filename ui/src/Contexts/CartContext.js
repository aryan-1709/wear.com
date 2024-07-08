import React, { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "../Contexts/userContext";
import {
  cartHandler,
  deleteItem,
  getProductById,
  clearCartItems,
} from "../controllers/cartHandler";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const { userInfo } = useContext(UserContext);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const setPrevCart = async () => {
      if (userInfo.cart.length !== 0) {
        const items = await getProductById(userInfo.cart);
        setCart(items);
      }
    };
    if (userInfo) {
      setPrevCart();
    }
  }, [userInfo]);

  const addToCart = async (product) => {
    if (!cart.includes(product)) {
      await cartHandler({ product: product, userId: userInfo._id, qty: 1 });
      setCart((prevCart) => [...prevCart, { products: product, qty: 1 }]);
    }
  };

  const removeFromCart = async (product) => {
    await deleteItem({ product: product, userId: userInfo._id, qty: 1 });
    setCart((prevCart) => prevCart.filter((item) => item.products !== product));
  };

  const clearCart = async () => {
    await clearCartItems({ userId: userInfo._id });
    setCart([]);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.products.price,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
