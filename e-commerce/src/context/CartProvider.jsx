import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthProvider';
import { db } from '../firebase-config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useTotalCarted } from '../hooks/useTotalCarted';
import { useUserActivity } from '../hooks/useUserActivity';

const CartContext = createContext();
export const useCart = () => useContext(CartContext)
export const CartProvider = ({children}) => {
  const {updateUserActivity} = useUserActivity();
  const {user} = useAuth();
  const [cartedItems, setCartedItems] = useState([]);
  const {totalCarted} = useTotalCarted();

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
        updatedCart = prevItems.map(item =>
          item.id === product.id 
            ? { ...item } 
            : item
        );

        if (user) {
          totalCarted(product.id, existingItem.cartedQuantity + 1);
          updateUserActivity({field:{cartedItems:updatedCart}})
        }

      } else {
        updatedCart = [...prevItems, { ...product, cartedQuantity: 1 }];

        if (user) {
          totalCarted(product.id, 1);
        }
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

      if(user){
        const userCartRef = doc(db, "users", user.uid);
        setDoc(userCartRef, { cartedItems: updatedCart }, { merge: true });
        updateUserActivity({field:{cartedItems:updatedCart}})

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


      if(user && type === "increase"){ 
        const currentItem = prevItems.find(item => item.id === checkId);
        if(currentItem){
          totalCarted(currentItem.id, currentItem.cartedQuantity + 1);

        }
      }
      else if(user && type ==="decrease"){
        const currentItem = prevItems.find(item => item.id === checkId);
        if(currentItem){
          totalCarted(currentItem.id, currentItem.cartedQuantity-1 > 0 ? currentItem.cartedQuantity:0);
        }
      }

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
