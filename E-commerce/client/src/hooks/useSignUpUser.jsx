import React from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config/firebase';
import { useNavigate } from 'react-router-dom';
import { useUserActivity } from './useUserActivity';
export const useSignUpUser = () => {
  const {updateUserActivity} = useUserActivity();
  const navigate = useNavigate()
    const handleSignUp = async(e,email,password,name)=>{
       e.preventDefault();
    
       try {
           const  createUserCredential = await createUserWithEmailAndPassword(auth,email,password);          
            console.log(createUserCredential.uid);
            await setDoc(doc(db, "users", createUserCredential.user.uid), {
          name:name,
          email: createUserCredential.user.email,
          role: "user",        
         createdAt: new Date()
         
});
            
          alert("You  have successfully created an account");
          navigate("/")
        
       } catch (err) {
        console.error("failed to sign up", err);
        alert("failed to sign up");
    
       }
    
     }
  return {handleSignUp}
}
