import React, { useEffect, useState } from 'react'
import { Layout } from '../components/Layout/Layout'
import { db } from '../firebase-config/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { ProductCard } from '../components/ProductCard/ProductCard'
import { useGetProducts } from '../hooks/useGetProducts'
import { CartSidebar } from '../components/Sidebar/CartSidebar'
import { useAuth } from '../context/AuthProvider'
import { useGetUserProfile } from '../hooks/useGetUserProfile'
import { SearchBar } from '../components/SearchBar/SearchBar'

export const HomePage = () => {

  const {user,loading} = useAuth();
 const {products} = useGetProducts();
 const [showSideBar, setShowSideBar] = useState(false);
const [cartedItems, setCartedItems] = useState([])
const  [profile, setProfile] = useState(null)
useEffect(() => {
 const loadProfile = async()=>{
  if(!user) return;
  const theProfile = await useGetUserProfile(user.uid);
setProfile(theProfile);
 }
 loadProfile();
}, [])

useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems"));
    if(savedCart) setCartedItems(savedCart);
}, []);

const removeFromCart= (idToDelete) =>{
   const presentCarted = cartedItems.filter((items)=>(items.id != idToDelete))
   setCartedItems(presentCarted);
}

  const cartedNumber = (checkId,type) =>{
   const updateCarted = cartedItems.map((item)=>{
      if(item.id===checkId){
        if(type==="increase"){
            return {...item,cartedQuantity:item.cartedQuantity+1}

        }
        else{
           return { ...item, cartedQuantity: Math.max(item.cartedQuantity -1,0) }

        }
      }
      return item;
  })
  setCartedItems(updateCarted)
  }


const addToCart = (product) => {
  setCartedItems((prevItems) => {
    const existingItem = prevItems.find(item => item.id === product.id);

    if (existingItem ) {
      return prevItems.map(item =>
        item.id === product.id 
          ? { ...item}
          : item
      );
    } else {
      return [...prevItems, { ...product, cartedQuantity: 1 }];
    }
  });
};
useEffect(() => {
  
  localStorage.setItem("cartItems",JSON.stringify(cartedItems))

 
}, [cartedItems]);

const totalCartedPrice =()=>{
  
  let total = 0;
  cartedItems.forEach((item)=>{
  total = total + item.price * item.cartedQuantity
  }
    
  )
  return total ;

}



  
  const closeSideBar = () => setShowSideBar(false)
  const openSideBar = () => setShowSideBar(true);
  return(
  <Layout>
    <div>
      <SearchBar/>
    </div>
    <p>{profile?.name}</p>
  <div>
    {
      products.map((product)=>(
   <ProductCard key={product.id} product={product} openSideBar={openSideBar}
   addToCart={addToCart}
   />
      )

      )
    }
  </div>
  <div>
          <CartSidebar showSidebar={showSideBar} cartedItems={cartedItems}
          cartedNumber={cartedNumber} removeFromCart={removeFromCart} closeSideBar={closeSideBar}
         totalCartedPrice={totalCartedPrice} />
    
  </div>

  </Layout>
  )
    
  
  
}
