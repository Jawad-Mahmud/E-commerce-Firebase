import React, { useState } from 'react'
import { doSignInWithEmailAndPassword } from '../Authentication/auth';
import { useCheckUserRole } from '../hooks/useCheckUserRole';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const {checkUserRole} = useCheckUserRole();
 const navigate = useNavigate();
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
const handleSubmit =async(e)=>{
  e.preventDefault();

  try {
    const userCredential = await doSignInWithEmailAndPassword(email,password);
    console.log("user things are...",userCredential.user);
    const userRole =await checkUserRole(userCredential.user);
    if(userRole=="admin"){
      console.log("admin here");
      alert("admin here");
      navigate("/admin")
    }
  

    else{
      navigate("/")
      console.log("going to home")
      alert("going to home")
    }
   
   

  } catch (err) {
    console.error("failed to connect ",err)
    alert("login failed")
  }
}

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300 font-semibold"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500 text-sm">
          Dont have an account?{" "}

        </p>
      </div>
    </div>

    
    </>
  )
}
