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
import { AdminPanel } from './AdminPanel/AdminPanel'
import { useCart } from '../context/CartProvider'
import HeroBG from "../assests/watch-hero.avif"
export const HomePage = () => {
   const {addToCart,removeFromCart,cartedNumber,totalCartedPrice,cartedItems} = useCart();
  const {user,loading} = useAuth();
 const {products} = useGetProducts();
 const [showSideBar, setShowSideBar] = useState(false);
const  [profile, setProfile] = useState(null)
useEffect(() => {
 const loadProfile = async()=>{
  if(!user) return;
  const theProfile = await useGetUserProfile(user.uid);
setProfile(theProfile);
 }
 loadProfile();
}, [])
 console.log("this is profile",profile);
 console.log("this is user",user);
  const closeSideBar = () => setShowSideBar(false)
  const openSideBar = () => setShowSideBar(true);
  return(
  <Layout>
    <div>
      <img src={HeroBG}/>
    </div>
    <div className='mt-2'>
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
