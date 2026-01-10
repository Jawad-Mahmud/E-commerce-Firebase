import { doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { db } from '../firebase-config/firebase'

export const useEditProduct = () => {
  const editProduct = async(id,updatedData) =>{
    try {
        const docRef = doc(db,"watches", id);
        await updateDoc(docRef,updatedData);
        
    } catch (err) {
        console.error("error updating product",err)
    }
  }
  return {editProduct}
}
