import { useState } from "react";
import React from 'react'
import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
// Import Icons for Search, Cart, and User
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';

export const Navbar = () => {
  const {user,loading} = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    // 1. Dark, sleek background for a luxury feel
    <nav className="bg-gray-900 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20"> {/* Increased height slightly */}
          
          {/* Logo - Bold and prominent */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-3xl font-serif font-bold tracking-widest uppercase text-yellow-400"> {/* Use a serif/elegant font simulation */}
              Timeless Co.
            </Link>
          </div>

          {/* Desktop Menu & Utility Icons */}
          <div className="hidden md:flex items-center space-x-6"> 
            
            {/* Primary Links */}
            <div className="flex space-x-4">
              <Link to="/" className="px-3 py-2 text-sm font-medium tracking-wider uppercase hover:text-yellow-400 transition duration-300">Home</Link>
              <Link to="/products" className="px-3 py-2 text-sm font-medium tracking-wider uppercase hover:text-yellow-400 transition duration-300">Shop All</Link>
              <Link to="/brands" className="px-3 py-2 text-sm font-medium tracking-wider uppercase hover:text-yellow-400 transition duration-300">Brands</Link>
              <Link to="/about" className="px-3 py-2 text-sm font-medium tracking-wider uppercase hover:text-yellow-400 transition duration-300">About</Link>
            </div>

            {/* Utility Icons (Search, Auth/Profile, Cart) */}
            <div className="flex items-center space-x-5 border-l border-gray-700 pl-6">
                
                {/* Search Icon */}
                <button className="text-xl hover:text-yellow-400 transition duration-300">
                    <FaSearch />
                </button>

                {/* Profile/Login Link */}
                {user ? (
                    <Link to={`/profile/${user.uid}`} className="text-xl hover:text-yellow-400 transition duration-300">
                        <FaUser />
                    </Link>
                ) : (
                    <Link to="/login" className="px-4 py-2 text-sm font-semibold border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 transition duration-300 rounded-sm">
                        Login
                    </Link>
                )}

                {/* Shopping Cart Icon */}
                <Link to="/cart" className="text-xl hover:text-yellow-400 transition duration-300 relative">
                    <FaShoppingCart />
                    {/* Optional: Add a small badge for item count */}
                    {/* <span className="absolute -top-2 -right-2 bg-red-600 text-xs w-4 h-4 rounded-full flex items-center justify-center">2</span> */}
                </Link>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              {isOpen ? (
                <FaTimes className="w-6 h-6" /> // Close Icon
              ) : (
                <FaBars className="w-6 h-6" /> // Hamburger Icon
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-yellow-400">Home</Link>
            <Link to="/products" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-yellow-400">Shop All</Link>
            <Link to="/brands" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-yellow-400">Brands</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-yellow-400">About</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-yellow-400">Contact</Link>
            
            {/* Mobile Auth Links */}
            {user ? (
                <Link to={`/profile/${user.uid}`} onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-yellow-400">
                    Profile
                </Link>
            ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium bg-yellow-400 text-gray-900 mt-2 font-semibold">
                    Login / Sign Up
                </Link>
            )}
            
            {/* Mobile Cart Link */}
            <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-yellow-400">
                <FaShoppingCart className="mr-2" /> Shopping Cart
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
};