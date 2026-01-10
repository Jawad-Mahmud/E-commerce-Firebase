import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import { Footer } from '../Footer/Footer'

export const Layout = ({children}) => {
  return (
    <>
    <Navbar/>
    {children}
    <Footer/>
    
    </>
  )
}
