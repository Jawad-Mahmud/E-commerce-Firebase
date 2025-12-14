import React from 'react'
import { Layout } from './components/Layout/Layout'
import { Router, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { NoPage } from './pages/NoPage'
import { ProductDetails } from './pages/ProductDetails'
import { AdminAddProduct } from './pages/AdminPanel/AdminAddProduct'
import { AdminPanel } from './pages/AdminPanel/AdminPanel'
import { AdminEditProduct } from './pages/AdminPanel/AdminEditProduct'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignUpPage'
import { ProtectRoute } from './routes/ProtectRoute'
import { ProtectAdminRoute } from './routes/ProtectAdminRoute'
import { UserProfile } from './pages/UserProfile'
import { UserActivity } from './pages/AdminPanel/UserActivity'

export const App = () => {
  return (
    <>
    <Routes>
      <Route path = "/" element = {<HomePage/>}/>
      <Route path='/*' element = {<NoPage/>} />
      <Route path='/product/:id' element = {<ProductDetails/>} />
      <Route path ="/admin" element = {
        <ProtectAdminRoute>
          <AdminPanel />
        </ProtectAdminRoute>
    
    } />
<Route
  path="/admin/add-product"
  element={
    <ProtectAdminRoute>
      <AdminAddProduct />
    </ProtectAdminRoute>
  }
/>

<Route
  path="/admin/edit-product/:id"
  element={
    <ProtectAdminRoute>
      <AdminEditProduct />
    </ProtectAdminRoute>
  }
/>
<Route
  path="/admin/user-activity"
  element={
    <ProtectAdminRoute>
      <UserActivity/>
    </ProtectAdminRoute>
  }
/>




      <Route path = "/profile/:id" element = {<UserProfile/>}/>
      <Route path = "/login" element = {<LoginPage/>}/>
      <Route path = "signup" element ={<SignupPage/>}/>
    </Routes>
    </>
    
  )
}
