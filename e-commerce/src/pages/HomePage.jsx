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
import { useGetHomeProducts } from '../hooks/useGetHomeSection'
import { useProductId } from '../hooks/useProductId'
import { ProductLoader } from '../components/ProductLoader/ProductLoader'

export const HomePage = () => {
  const {individual} = useProductId()
  const {homeProducts} = useGetHomeProducts()
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
 console.log("this products",products)
 console.log("this is user",user);
 console.log("h",homeProducts)
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
 {/*   <div>
    {
      products.map((product)=>(
   <ProductCard key={product.id} product={product} openSideBar={openSideBar}
   addToCart={addToCart}
   />
      )

      )
    }
  </div>  */}
  
  
  <div className="w-full mt-6 flex justify-center px-4"> 
  {/* The outer container is now a flex-center to keep the whole section middle-aligned */}
  
  <div
    className="
      flex 
      /* Responsive Direction */
      flex-col           /* Vertical on mobile */
      sm:flex-row        /* Horizontal on tablet/desktop */
      
      /* Centering & Spacing */
      items-center       /* Centers items along the cross-axis */
      justify-center     /* Centers items along the main-axis */
      gap-8 sm:gap-6 
      
      /* Horizontal Scroll logic - only active on sm screens and up */
      sm:overflow-x-auto 
      sm:snap-x sm:snap-mandatory 
      scrollbar-thin scrollbar-thumb-yellow-600 scrollbar-track-transparent
      
      /* Sizing */
      w-full max-w-7xl   /* Prevents the section from becoming too wide on ultra-wide screens */
      mx-auto 
      py-6
      animate-fadeIn
    "
  >
    {
      homeProducts.map(section =>
        
        section.items.map(id => (
          <div 
            key={id}
            className="
              snap-center 
              /* Responsive Widths */
              w-full sm:min-w-[240px] md:min-w-[260px] 
              max-w-[320px]      /* Prevents cards from being too wide on mobile */
              
              /* Luxury Hover Effects */
              transform transition duration-500 
              hover:scale-105 
              sm:hover:-translate-y-2
            "
          >
            <ProductLoader
              id={id}
              openSideBar={openSideBar}
              addToCart={addToCart}
            />
          </div>
        ))
      )
    }
  </div>
</div>

    

  <div>
          <CartSidebar showSidebar={showSideBar} cartedItems={cartedItems}
          cartedNumber={cartedNumber} removeFromCart={removeFromCart} closeSideBar={closeSideBar}
         totalCartedPrice={totalCartedPrice} />
    
  </div>
   
  </Layout>

  )
    
  
  
}
