import { useState } from "react";
import React from 'react'
import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";
export const Navbar = () => {
  const {user,loading} = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-gray-900 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-wide">
              Timeless Co.
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6"> 
            
            <div className="flex space-x-4">
              <Link to="/" className="px-3 py-2 text-sm font-medium hover:text-gray-700 transition">Home</Link>
              <Link to="/products" className="px-3 py-2 text-sm font-medium hover:text-gray-700 transition">Shop All</Link>
              <Link to="/brands" className="px-3 py-2 text-sm font-medium hover:text-gray-700 transition">Brands</Link>
              <Link to="/about" className="px-3 py-2 text-sm font-medium hover:text-gray-700 transition">About</Link>
            </div>

            <div className="flex items-center space-x-5 border-l pl-6">
                
                <button className="text-xl text-gray-700 hover:text-gray-900 transition">
                    <FaSearch />
                </button>

                {user ? (
                    <Link to={`/profile/${user.uid}`} className="text-xl text-gray-700 hover:text-gray-900 transition">
                        <FaUser />
                    </Link>
                ) : (
                    <Link to="/login" className="px-4 py-2 text-sm font-semibold border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition rounded">
                        Login
                    </Link>
                )}

                <Link to="/cart" className="text-xl text-gray-700 hover:text-gray-900 transition relative">
                    <FaShoppingCart />
                </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="md:hidden bg-white border-t overflow-hidden"
        >
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            exit={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
          >
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">Home</Link>
            <Link to="/products" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">Shop All</Link>
            <Link to="/brands" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">Brands</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">About</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">Contact</Link>
            
            {user ? (
                <Link to={`/profile/${user.uid}`} onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">
                    Profile
                </Link>
            ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium bg-gray-900 text-white mt-2">
                    Login / Sign Up
                </Link>
            )}
            
            <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">
                <FaShoppingCart className="mr-2" /> Shopping Cart
            </Link>

          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

    </nav>
  );
};
