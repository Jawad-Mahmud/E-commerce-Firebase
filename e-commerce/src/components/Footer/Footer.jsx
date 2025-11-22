import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Logo / Name */}
          <div className="mb-4 md:mb-0">
            <a href="/" className="text-xl font-bold">MyShop</a>
          </div>

          {/* Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="/" className="hover:text-gray-200">Home</a>
            <a href="/products" className="hover:text-gray-200">Products</a>
            <a href="/about" className="hover:text-gray-200">About</a>
            <a href="/contact" className="hover:text-gray-200">Contact</a>
          </div>

          {/* Social or Info */}
          <div className="text-sm">
            &copy; {new Date().getFullYear()} MyShop. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

