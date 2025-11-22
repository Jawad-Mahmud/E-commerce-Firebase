import { doc, getDoc } from 'firebase/firestore'
import React from 'react'
import { db } from '../firebase-config/firebase'

export const useCheckUserRole = () => {

  const checkUserRole = async(user)=>{
   const docSnap = await getDoc(doc(db,"users",user.uid));
     console.log("docSnap fetched:", docSnap);

   if(docSnap.exists()){
    console.log(docSnap.data());
    const userData = docSnap.data();
    return userData.role;
   }
       console.log("No document found, returning unknown");

   return "unknown";
   
  }

  return {checkUserRole}

}
