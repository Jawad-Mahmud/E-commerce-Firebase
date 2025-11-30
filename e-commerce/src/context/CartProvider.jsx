import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthProvider';
import { db } from '../firebase-config/firebase';
import { doc, setDoc } from 'firebase/firestore';

const CartContext = createContext();
export const useCart = () => useContext(CartContext)
export const CartProvider = ({children}) => {
  const {user} = useAuth();
  const [cartedItems, setCartedItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCart) setCartedItems(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartedItems));
  }, [cartedItems]);

  const addToCart = (product) => {
    setCartedItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      let updatedCart;
      if (existingItem) {
         updatedCart=prevItems.map(item =>
          item.id === product.id 
            ? { ...item }
            : item
        );
         


      } else {
        updatedCart= [...prevItems, { ...product, cartedQuantity: 1 }];
      }

          if (user) {
      const userCartRef = doc(db, "users", user.uid);
      setDoc(userCartRef, { cartedItems: updatedCart }, { merge: true });
    }
 
  return updatedCart;

    });
  };

  const removeFromCart = (idToDelete) => {
  setCartedItems((prevItems) => {
    const updatedCart = prevItems.filter(item => item.id !== idToDelete);

    if (user) {
      const userCartRef = doc(db, "users", user.uid);
      setDoc(userCartRef, { cartedItems: updatedCart }, { merge: true });
    }

    return updatedCart;
  });
};


const cartedNumber = (checkId, type) => {
  setCartedItems((prevItems) => {
    const updatedCart = prevItems.map(item =>
      item.id === checkId
        ? {
            ...item,
            cartedQuantity:
              type === "increase"
                ? item.cartedQuantity + 1
                : Math.max(item.cartedQuantity - 1, 0)
          }
        : item
    );

    if (user) {
      const userCartRef = doc(db, "users", user.uid);
      setDoc(userCartRef, { cartedItems: updatedCart }, { merge: true });
    }

    return updatedCart;
  });
};
  const totalCartedPrice =()=>{
    let total = 0;
    cartedItems.forEach((item)=>{
      total = total + item.price * item.cartedQuantity
    })
    return total;
  }


return (
    <CartContext.Provider
      value={{
        cartedItems,
        addToCart,
        removeFromCart,
        cartedNumber,
        totalCartedPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
