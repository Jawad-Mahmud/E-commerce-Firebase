import React from 'react'
import { db } from '../firebase-config/firebase'
import { doc, updateDoc } from 'firebase/firestore'

export const useTotalCarted = () => {
  
    const totalCarted = async(productId,quantity)=>{
      if(!productId) return;
        try {
          const docRef = doc(db,"watches",productId);
          await updateDoc(docRef,{
            totalCarted:quantity
          });
            
        } catch (error) {
           console.error("failed to update totalCarted",error); 
        }
    }
  return {totalCarted};
}
