import { addDoc, collection } from 'firebase/firestore';
import React from 'react'
import { db } from '../firebase-config/firebase';


export const useAddProducts = () => {
    const docRef = collection(db,"watches")
   const addProducts = async({
     image,
  name,
  price,
  brand,
  quantity,
  description

   }) => {
     try {

        const addProducts = await  addDoc(docRef,{
            image,name,price:Number(price),brand,quantity:Number(quantity),description
        })
        
     } catch (err) {
        console.error("error adding",err);
     }

   }

  return {addProducts}
}
