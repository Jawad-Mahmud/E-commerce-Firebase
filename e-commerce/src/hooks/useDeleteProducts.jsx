import { deleteDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../firebase-config/firebase';

export const useDeleteProducts = () => {

    const deleteProduct = async(id) =>{
      try {
        const docRef = doc(db, "watches" ,id);
        await deleteDoc(docRef)
        
      } catch (err) {
        console.error("failed to delete",err);
      }  
    }
  return {deleteProduct}
}
