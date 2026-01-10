import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCheckUserRole } from '../hooks/useCheckUserRole'
import { useAuth } from '../context/AuthProvider'

export const ProtectAdminRoute = ({children}) => {
const {user,loading} = useAuth()
  const [role, setRole] = useState(null)

const {checkUserRole} = useCheckUserRole();

   const navigate = useNavigate()
    useEffect(() => {
       const verifyRole = async ()=>{
        if(!user){
            navigate("/login")
            return;
        }
        const userRole = await checkUserRole(user);
        setRole(userRole)
        if(userRole!=="admin"){
            navigate("/");
        }
       }
       verifyRole();
     
    }, [user,navigate])
    
    if(loading || !role ){
        return <div>loading...</div>
    }
    return <>{children}</>
    
}
