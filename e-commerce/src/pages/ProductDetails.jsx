import React, { useEffect, useState } from 'react'
import { db } from '../firebase-config/firebase'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { Layout } from '../components/Layout/Layout'
import { FaShippingFast, FaShieldAlt, FaBoxOpen, FaMoneyBillWave,FaInfoCircle } from "react-icons/fa";
import { useProductId } from '../hooks/useProductId'


export const ProductDetails = () => {
  const { id } = useParams();
  const[product,setProduct] = useState(null);
  
  useEffect(() => {
    const fetchProduct = async () =>{
      const docRef = doc(db,"watches",id);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists())setProduct(docSnap.data())
    }

    fetchProduct();

  }, [])
  
  return (

<Layout>
  {product && (
    <div className="flex flex-col items-center justify-start min-h-screen w-full px-4 
                    lg:flex-row lg:items-start lg:justify-center lg:space-x-48 lg:px-24 lg:pt-12">

      {/* Product Image */}
      <div className="w-64 h-80 mt-8 lg:mt-0 lg:w-72 lg:h-96 rounded-2xl overflow-hidden shadow-xl 
                      bg-white hover:scale-105 transition-transform duration-300">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="mt-12 text-center lg:mt-0 lg:text-left">
        <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl text-gray-900">
          {product.name}
        </h1>
        <p className="mt-3 text-lg lg:text-2xl font-semibold text-blue-700">
          Price: ${product.price}
        </p>

        {/* Buttons */}
<div className="flex flex-col sm:flex-row gap-8 mt-6 
                items-center justify-center w-full">
  <button className="bg-black text-amber-50 w-36 h-10 rounded-xl shadow-md 
                     hover:bg-gray-800 transition-colors duration-200">
    Add to cart
  </button>
  <button className="bg-blue-600 text-amber-50 w-36 h-10 rounded-xl shadow-md 
                     hover:bg-blue-700 transition-colors duration-200">
    Buy Now
  </button>
</div>


        {/* Product Features */}
        <div className="mt-8 space-y-3 text-gray-700 font-medium">
          <p className="flex items-center gap-3">
            <FaShippingFast className="text-blue-600 text-xl" /> Fastest Delivery (1-3 days)
          </p>
          <p className="flex items-center gap-3">
            <FaShieldAlt className="text-green-600 text-xl" /> Branded Warranty
          </p>
          <p className="flex items-center gap-3">
            <FaBoxOpen className="text-orange-500 text-xl" /> 100% Genuine Product with Original Boxing
          </p>
          <p className="flex items-center gap-3">
            <FaMoneyBillWave className="text-gray-800 text-xl" /> Cash On Delivery
          </p>
        </div>
<p className="text-gray-400 mt-4 flex items-start gap-2">
  <FaInfoCircle className="text-gray-400 mt-1" />
  Colour Disclaimer: Actual product colour may vary slightly from the images shown due to lighting, editing, or display resolution.
</p>

      </div>
    </div>
  )}
</Layout>

  )
}
