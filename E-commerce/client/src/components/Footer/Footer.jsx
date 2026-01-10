import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // 1. Dark background to match the Navbar
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-gray-700">
          
          {/* 1. Logo / Branding */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="text-3xl font-serif font-bold tracking-widest uppercase text-yellow-400">
              Timeless Co.
            </a>
            <p className="mt-4 text-sm text-gray-400">
              Curating the world's finest timepieces, delivered with guaranteed authenticity.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition">
                <FaInstagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition">
                <FaFacebookF size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          {/* 2. Customer Service Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/faq" className="hover:text-yellow-400 transition">FAQ</a></li>
              <li><a href="/shipping" className="hover:text-yellow-400 transition">Shipping & Returns</a></li>
              <li><a href="/warranty" className="hover:text-yellow-400 transition">Warranty</a></li>
              <li><a href="/contact" className="hover:text-yellow-400 transition">Contact Us</a></li>
            </ul>
          </div>

          {/* 3. Shop Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/products" className="hover:text-yellow-400 transition">Shop All</a></li>
              <li><a href="/categories/mens" className="hover:text-yellow-400 transition">Men's Watches</a></li>
              <li><a href="/categories/womens" className="hover:text-yellow-400 transition">Women's Watches</a></li>
              <li><a href="/brands" className="hover:text-yellow-400 transition">Brands A-Z</a></li>
            </ul>
          </div>
          
          {/* 4. Legal & Company */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/about" className="hover:text-yellow-400 transition">Our Story</a></li>
              <li><a href="/careers" className="hover:text-yellow-400 transition">Careers</a></li>
              <li><a href="/privacy" className="hover:text-yellow-400 transition">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-yellow-400 transition">Terms of Service</a></li>
            </ul>
          </div>

        </div>
        
        {/* Copyright */}
        <div className="pt-6 text-center text-sm text-gray-500">
          &copy; {currentYear} Timeless Co. All rights reserved. | Built with React and Firebase
        </div>
      </div>
    </footer>
  );
};