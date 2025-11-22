import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'


export const ProtectRoute = ({children}) => {
  const navigate = useNavigate()
    const {user,loading} = useAuth()
    
    useEffect(() => {
      if(!user){
        navigate("/login")
      }

      
    }, [user])
    

  return<>{!loading?children:"wait..."}</>
}

