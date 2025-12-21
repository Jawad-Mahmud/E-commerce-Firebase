import React from 'react'
import { db } from '../firebase-config/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
export const useAddHomeSection = () => {
const docRef = collection(db,"homePageSection");
const addHomeSection = async({
    items,
    title
})=>{
    try {
        const addProducts = await addDoc(docRef,{
            items,title,createdAt:serverTimestamp()
        })
    } catch (err) {
                console.error("error adding home section",err);

    }
}
    
  return{addHomeSection}
}
