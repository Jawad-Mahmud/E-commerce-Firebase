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
  setSelectCategory(prev =>{
    if(prev.includes(brand)){
      return prev.filter(item=>item!==brand)
    }
    return[...prev,brand]
  })
 }
 useEffect(() => {
  const getEachBrand = ()=>{
  const brands = products?.map((product)=>product.brand.toUpperCase())
   const uniqueBrands = [...new Set(brands)]
   console.log(" unique brand",uniqueBrands);
   console.log("get product for brand",products)
   setEachBrand(uniqueBrands)

 }
 getEachBrand();
 }, [products])
   console.log("this products", products);


  { /*console.log("this is profile", profile);
  console.log("this products", products);
  console.log("this is user", user);
  console.log("h", homeProducts);*/}

  const closeSideBar = () => setShowSideBar(false);
  const openSideBar = () => setShowSideBar(true);

  return (
    <Layout>
      <div>
        <img src={HeroBG} />
      </div>
      <div className="mt-2">
        <SearchBar />
      </div>
      <p>{profile?.name}</p>



      {/* Products Section and category sidebar section */}
<div className="flex  gap-4">
   <div 
  className="
    flex flex-col gap-4
    w-1/4                
    bg-white dark:bg-gray-900
    p-4 rounded-2xl border border-gray-100 dark:border-gray-800
  "
>
  
  <div className="flex flex-row items-center gap-2 ">
    <div className='text-yellow-500'>
      <HiAdjustments size={22} />
    </div>
    <div className='text-[9px] font-serif font-bold tracking-widest uppercase text-gray-900 dark:text-yellow-400 hover:text-yellow-500 transition duration-300 cursor-pointer'>
      Category
    </div>
  </div>

  <div className='grid grid-cols-2 gap-2'>
    { 
      eachBrand.map((brand)=>(
        
        <div key={brand}
          className='bg-[#f4f4f4] dark:bg-gray-800/50 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tight p-2 rounded-lg text-center hover:bg-yellow-500 hover:text-black dark:hover:text-black transition-all duration-300 cursor-pointer border border-transparent hover:border-yellow-400' 
          
          onClick={()=>clickedCategory(brand)}
        >
          {brand}   
        </div>
      ))
    }
  </div>
</div>
{/*Category side bar finish here */}

<div className='grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 '>
           {
        filtered.length>0? filtered.map((product)=>(
          <ProductCard addToCart={addToCart} openSideBar={openSideBar} product={product}/>
         ) ) : products.map((product)=>(
          <ProductCard addToCart={addToCart} openSideBar={openSideBar} product={product}/>
         ) )
      }

      </div>


      </div>
      
     

      {/* Our Brands Section */}
      <div className=' flex flex-col items-center justify-center p-2'>
        <div className="mb-4 text-xl font-serif font-bold tracking-widest uppercase text-yellow-400">
          Our Brand
        </div>
        <div className='flex lg:flex-row flex-col '>

          <div className="m-2"><img src="/logo1.png" alt="Logo 1" className="w-32 h-auto" /></div>
          <div className="m-2"><img src="/logo2.png" alt="Logo 2" className="w-32 h-auto" /></div>
          <div className="m-2"><img src="/logo3.png" alt="Logo 3" className="w-32 h-auto" /></div>
          <div className="m-2"><img src="/logo4.png" alt="Logo 4" className="w-32 h-auto" /></div>
          <div className="m-2"><img src="/logo5.png" alt="Logo 5" className="w-32 h-auto" /></div>
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
