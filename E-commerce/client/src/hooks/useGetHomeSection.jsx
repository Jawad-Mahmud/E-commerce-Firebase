import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase-config/firebase'
export const useGetHomeProducts = () => {
    const [homeProducts, setHomeProducts] = useState([])
      useEffect(() => {
      const fetchProducts = async() =>{

     try {
          
          const querySnapshot = await getDocs(collection(db,"homePageSection"));
          const items = querySnapshot.docs.map((doc)=>({
            id: doc.id,
            ...doc.data()
          }))
          console.log("home page items",items);
            setHomeProducts(items)
        }
        
     
      catch (err) {
        console.error("Error fetching data: ",err)
        
     }
    }

    fetchProducts()
      
      }, [])

  return {homeProducts}
}
