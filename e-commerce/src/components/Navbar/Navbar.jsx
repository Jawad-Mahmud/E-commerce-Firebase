import { useState } from "react";
import React from 'react'
import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
export const Navbar = () => {
  const {user,loading} = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold">MyShop</a>
          </div>

          {/* Desktop Menu */}
<div className="hidden md:flex items-center space-x-4 p-2 rounded"> 
  
  <Link
    to="/"
    className="px-3 py-2 rounded hover:bg-blue-400 transition"
  >
    Home
  </Link>
  <Link
    to="/products"
    className="px-3 py-2 rounded hover:bg-blue-400 transition"
  >
    Products
  </Link>
  <Link
    to="/about"
    className="px-3 py-2 rounded hover:bg-blue-400 transition"
  >
    About
  </Link>
  <Link
    to="/contact"
    className="px-3 py-2 rounded hover:bg-blue-400 transition"
  >
    Contact
  </Link>

  
  {user ? (
    <Link
      to={`/profile/${user.uid}`}
      className="px-3 py-2 rounded hover:bg-blue-400 transition ml-auto"
    >
      Profile
    </Link>
  ) : (
    <Link
      to="/login"
      className="px-3 py-2 rounded hover:bg-blue-400 transition ml-auto"
    >
      Login
    </Link>
  )}
</div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-500 px-2 pt-2 pb-4 space-y-1">

<Link to="/" className="block hover:bg-blue-400 px-3 py-2 rounded">Home</Link>
<Link to="/products" className="block hover:bg-blue-400 px-3 py-2 rounded">Products</Link>
<Link to="/about" className="block hover:bg-blue-400 px-3 py-2 rounded">About</Link>
<Link to="/contact" className="block hover:bg-blue-400 px-3 py-2 rounded">Contact</Link>
{
  user?(
    <Link to={`/profile/${user.uid}`} className="block hover:bg-blue-400 px-3 py-2 rounded">
      Profile
    </Link>
  ):
  (
    <Link to="/login" className="block hover:bg-blue-400 px-3 py-2 rounded">
      Log in
    </Link>
  )
}
        </div>
      )}
    </nav>
  );
};


