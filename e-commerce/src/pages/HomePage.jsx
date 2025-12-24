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
  flex-col 
  sm:flex-row 
  items-center 
  justify-center 
  gap-8 sm:gap-6 
  sm:overflow-x-auto 
  sm:snap-x sm:snap-mandatory 
  scrollbar-thin scrollbar-thumb-yellow-600 scrollbar-track-transparent 
  w-full max-w-7xl 
  mx-auto 
  py-6 
  animate-fadeIn
    "
  >
{
  homeProducts.map(section => (
    <div key={section.title} className="mb-10 px-4">
      <div className='mb-4 text-xl font-serif font-bold tracking-widest uppercase text-yellow-400'>
        <h1>{section.title}</h1>
      </div>
      
      <div className="
        /* Mobile/Medium: Vertical Stack */
        grid grid-cols-1 justify-items-center gap-8
        
        /* Big Display: Horizontal Row */
        lg:flex lg:flex-row lg:flex-nowrap 
        
        /* FIX THE GAP HERE */
        lg:gap-4 lg:justify-start 
        
        /* Scroll logic */
        lg:overflow-x-auto hide-scrollbar
      ">
        {
          section.items.map(id => (
            <div 
              key={id}
              /* flex-shrink-0 is vital so cards don't squish */
              className="flex-shrink-0" 
            >
              <ProductLoader
                id={id}
                openSideBar={openSideBar}
                addToCart={addToCart}
              />
            </div>
          ))
        }
      </div>


    </div>
  ))
}
    
  </div>
     
</div>


  <div className="w-full mt-6 flex justify-center px-4"> 
  <div
    className="
      flex 
      flex-col 
      items-start 
      w-full max-w-7xl 
      mx-auto 
      py-6 
      animate-fadeIn
    "
  >    

    {/* Title — same structure as section.title */}
    <div className="mb-10 px-4">
      <div className='mb-4 text-xl font-serif font-bold tracking-widest uppercase text-yellow-400'>
        <h1>Our Brands</h1>
      </div>
    </div>

    {/* Cards container — same structure */}
    <div className="
      grid grid-cols-1 justify-items-center gap-8
      lg:flex lg:flex-row lg:flex-nowrap 
      lg:gap-6 
      lg:overflow-x-auto 
      hide-scrollbar
      w-full
    ">
      {/* Brands Cards go here */}
      <div>
        

      </div>
    </div>

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
