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
import HeroBG from "../assets/watch-hero.avif"
import { useGetHomeProducts } from '../hooks/useGetHomeSection'
import { useProductId } from '../hooks/useProductId'
import { ProductLoader } from '../components/ProductLoader/ProductLoader'
import { HiAdjustments } from "react-icons/hi";
import { useGetCategory } from '../hooks/useGetCategory'
import { motion } from 'framer-motion'

export const HomePage = () => {
  const {filtered,setSelectCategory} = useGetCategory();
  const { individual } = useProductId();
  const { homeProducts } = useGetHomeProducts();
  const { addToCart, removeFromCart, cartedNumber, totalCartedPrice, cartedItems } = useCart();
  const { user, loading } = useAuth();
  const { products } = useGetProducts();
  const [showSideBar, setShowSideBar] = useState(false);
  const [profile, setProfile] = useState(null);
  const[eachBrand,setEachBrand] = useState([])
  
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      const theProfile = await useGetUserProfile(user.uid);
      setProfile(theProfile);
    };
    loadProfile();
  }, [user]);
 const clickedCategory = (brand) => {
  const cleanBrand = brand.trim()
  setSelectCategory(prev => {
    if(prev.includes(cleanBrand)){
      return prev.filter(item=>item!==cleanBrand)
    }



    return [...prev, cleanBrand]
  })
}
 

 
 

 useEffect(() => {
  const getEachBrand = ()=>{
  const brands = products?.map((product)=>product.brand.toUpperCase().trim())
   const uniqueBrands = [...new Set(brands)]
   console.log(" unique brand",uniqueBrands);
   console.log("get product for brand",products)
   setEachBrand(uniqueBrands)
    
 }
 getEachBrand();
 }, [products])
   console.log("this products", products);

   
   console.log("f",filtered)
   console.log("each brand",eachBrand)

   

  { /*console.log("this is profile", profile);
  console.log("this products", products);
  console.log("this is user", user);
  console.log("h", homeProducts);*/}

  const closeSideBar = () => setShowSideBar(false);
  const openSideBar = () => setShowSideBar(true);

  return (
    <Layout>
     
      <div className="mt-3 mb-3">
        <SearchBar />
      </div>



      {/* Products Section and category sidebar section */}
<div className="flex gap-4">

  {/* Category Sidebar */}
  <div className="flex flex-col gap-4 w-1/4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
    
    <div className="flex items-center gap-2">
      <div className="text-gray-900">
        <HiAdjustments size={22} />
      </div>
      <div className="text-[10px] font-serif font-bold tracking-widest uppercase text-gray-900 hover:text-gray-900 transition duration-300 cursor-pointer">
        Category
      </div>
    </div>

    <div className="grid grid-cols-2 gap-2">
      {eachBrand.map((brand) => (
        <div
          key={brand}
          onClick={() => clickedCategory(brand)}
          className={`text-[10px] font-bold uppercase tracking-tight p-2 rounded-lg text-center transition-all duration-300 cursor-pointer border
            ${
              filtered.some(product => product.brand.toUpperCase().trim() === brand)
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-gray-100 text-gray-900 border-gray-200 hover:bg-gray-900 hover:text-white'
            }`}
        >
          {brand}
        </div>
      ))}
    </div>

  </div>
  {/* Category Sidebar ends */}

  {/* Product Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-1">
    {(filtered.length > 0 ? filtered : products).map((product) => (
      <ProductCard
        key={product.id}
        addToCart={addToCart}
        openSideBar={openSideBar}
        product={product}
      />
    ))}
  </div>

</div>



      
     

      {/* Our Brands Section */}
<div className="w-full p-4">

  <div className="mb-4 text-xl font-serif font-bold tracking-widest uppercase text-gray-900 text-center">
    Our Brand
  </div>

  <div className="hidden lg:block overflow-hidden bg-white shadow-sm rounded-2xl">
    <motion.div
      className="flex w-[200%] items-center"
      animate={{ x: ["0%", "-50%"] }}
      transition={{
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 25,
          ease: "linear"
        }
      }}
    >
      {[ "/logo1.png", "/logo2.png", "/logo3.png", "/logo4.png", "/logo5.png" ].map((logo, index) => (
        <div
          key={index}
          className="m-4 p-2 rounded-lg flex-shrink-0 transition-transform duration-300 hover:scale-105 hover:shadow-md"
        >
          <img src={logo} alt={`Logo ${index + 1}`} className="w-32 h-auto" />
        </div>
      ))}

      {[ "/logo1.png", "/logo2.png", "/logo3.png", "/logo4.png", "/logo5.png" ].map((logo, index) => (
        <div
          key={"dup" + index}
          className="m-4 p-2 rounded-lg flex-shrink-0 transition-transform duration-300 hover:scale-105 hover:shadow-md"
        >
          <img src={logo} alt={`Logo duplicate ${index + 1}`} className="w-32 h-auto" />
        </div>
      ))}
    </motion.div>
  </div>

  {/* Mobile/Tablet fallback:  logos */}
  <div className="flex lg:hidden flex-col items-center justify-center bg-white rounded-2xl shadow-sm p-4">
    <div className="flex flex-col   sm:flex-row flex-wrap items-center justify-center">
      {[ "/logo1.png", "/logo2.png", "/logo3.png", "/logo4.png", "/logo5.png" ].map((logo, index) => (
        <div
          key={index}
          className="m-2 p-2 rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-md"
        >
          <img src={logo} alt={`Logo ${index + 1}`} className="w-32 h-auto" />
        </div>
      ))}
    </div>
  </div>

</div>



    

      {/* Cart Sidebar */}
      <div>
        <CartSidebar
          showSidebar={showSideBar}
          cartedItems={cartedItems}
          cartedNumber={cartedNumber}
          removeFromCart={removeFromCart}
          closeSideBar={closeSideBar}
          totalCartedPrice={totalCartedPrice}
        />
      </div>
    </Layout>
  );
};
