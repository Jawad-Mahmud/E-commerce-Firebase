import React, { useEffect, useState } from 'react'
import { db } from '../firebase-config/firebase'
import { useParams, Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { Layout } from '../components/Layout/Layout'
import { FaShippingFast, FaShieldAlt, FaBoxOpen, FaMoneyBillWave, FaInfoCircle } from "react-icons/fa";

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "watches", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setProduct(docSnap.data())
    }
    fetchProduct();
  }, [id])

  return (
    <Layout>
      {product && (
        <div className="flex flex-col items-center justify-start min-h-screen w-full px-4 
                        lg:flex-row lg:items-start lg:justify-center lg:space-x-48 lg:px-24 lg:pt-12 bg-white">

          {/* Product Image - Matching Homepage Card Style */}
{/* Product Image */}
<div className="mt-8 lg:mt-0">
  <img
    src={product.image}
    alt={product.name}
    className="w-56 sm:w-64 lg:w-[500px] lg:h-[300px] rounded-2xl shadow-xl object-contain"
  />
</div>


          {/* Product Info */}
          <div className="mt-12 text-center lg:mt-0 lg:text-left">
            <h1 className="text-2xl font-serif font-bold sm:text-3xl lg:text-4xl text-gray-900 tracking-widest uppercase">
              {product.name}
            </h1>
            
            {/* Price - Using your Brand Yellow */}
            <p className="mt-3 text-lg lg:text-2xl font-black text-yellow-500">
              Price: ${product.price}
            </p>

            {/* Buttons - Matching your Home Theme */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 items-center justify-center lg:justify-start w-full">
              <button className="bg-yellow-500 text-black font-bold w-44 h-12 rounded-xl shadow-md 
                                 hover:bg-yellow-600 transition-colors duration-200 uppercase text-xs tracking-widest">
                Add to cart
              </button>
              <button className="bg-gray-900 text-white font-bold w-44 h-12 rounded-xl shadow-md 
                                 hover:bg-gray-800 transition-colors duration-200 uppercase text-xs tracking-widest">
                Buy Now
              </button>
            </div>

            {/* Product Features - Icons switched to Yellow */}
            <div className="mt-8 space-y-3 text-gray-600 font-medium text-sm">
              <p className="flex items-center gap-3">
                <FaShippingFast className="text-yellow-500 text-xl" /> Fastest Delivery (1-3 days)
              </p>
              <p className="flex items-center gap-3">
                <FaShieldAlt className="text-yellow-500 text-xl" /> Branded Warranty
              </p>
              <p className="flex items-center gap-3">
                <FaBoxOpen className="text-yellow-500 text-xl" /> 100% Genuine Product with Original Boxing
              </p>
              <p className="flex items-center gap-3">
                <FaMoneyBillWave className="text-yellow-500 text-xl" /> Cash On Delivery
              </p>
            </div>

            {/* Disclaimer */}
            <p className="text-gray-400 mt-6 flex items-start gap-2 text-xs italic max-w-md">
              <FaInfoCircle className="mt-1 flex-shrink-0" />
              Colour Disclaimer: Actual product colour may vary slightly from the images shown due to lighting, editing, or display resolution.
            </p>

          </div>
        </div>
      )}
    </Layout>
  )
}