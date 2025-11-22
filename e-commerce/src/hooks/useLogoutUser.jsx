import React from 'react'
import { auth } from '../firebase-config/firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const useLogoutUser = () => {
 const navigate = useNavigate
    const handleLogOut =async()=>{
        try {
          await signOut(auth);
          alert ("You have logged out")
          navigate("/");

        } catch (err) {
          console.error("log out failed",err)
          alert("log out failed")
        }
    }
  return {handleLogOut}
}
 