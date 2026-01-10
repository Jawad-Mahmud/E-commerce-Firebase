import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthProvider'
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config/firebase';
export const useUserActivity =  () => {

const {user} = useAuth();

const updateUserActivity = async({field})=>{
if(!user) return;
try {
  const docRef = doc(db,"userActivity",user.uid);
  await setDoc(
    docRef,{
      ...field,
      lastUpdated: serverTimestamp() 
    },
    {merge:true}
  )
  console.log("user activity updated 22222");
} catch (err) {
  console.error("error updating user activity",err);
}
}


     
  return {updateUserActivity};

}
