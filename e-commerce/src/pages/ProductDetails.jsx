import React, { useEffect, useState } from 'react'
import { db } from '../firebase-config/firebase'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { Layout } from '../components/Layout/Layout'

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
<div className="flex flex-col items-center justify-start min-h-screen w-full px-4 lg:flex-row lg:items-start lg:justify-center lg:space-x-48 lg:px-24 lg:pt-12">
  <div className="w-64 h-80 mt-8 lg:mt-0 lg:w-72 lg:h-96">
    <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl shadow-md" />
  </div>

  <div className="mt-12 text-center lg:mt-0 lg:text-left">
    <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">{product.name}</h1>
    <p className="mt-3 text-lg lg:text-2xl">Price: ${product.price}</p>
  </div>
  <div className='flex flex-col sm:flex-row gap-8'>
     <button className='bg-black text-amber-50 w-36 h-10 '>Add to cart</button>
  <button className='bg-blue-600 text-amber-50 w-36 h-10  '>Buy Now</button>

  </div>


</div>

      )}
    </Layout>
  )
}
