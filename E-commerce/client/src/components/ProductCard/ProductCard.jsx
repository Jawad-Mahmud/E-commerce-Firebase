import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEye } from 'react-icons/fi';

export const ProductCard = ({ product, openSideBar, addToCart }) => {
  return (
 
<div className="group w-full max-w-[160px] sm:max-w-[190px] lg:max-w-[170px] mx-6 bg-white dark:bg-transparent flex flex-col transition-all duration-300 hover:shadow-amber-400">
      
      {/* 1. Image: Fixed Aspect Ratio */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f4f4f4] dark:bg-gray-900 border border-gray-100 rounded-2xl hover:shadow-amber-400">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        
        {/* Quick Action Overlay (Slide-up effect) */}
        <div className="absolute bottom-0 left-0 right-0 flex translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
           <button 
             onClick={() => { addToCart(product); openSideBar(); }}
             className="flex-1 bg-yellow-500 text-black py-3 flex justify-center items-center hover:bg-yellow-600 transition-colors"
             title="Add to Cart"
           >
             <FiPlus size={20} />
           </button>
           <Link 
             to={`/product/${product.id}`}
             className="flex-1 bg-gray-900 text-white py-3 flex justify-center items-center hover:bg-gray-800 transition-colors border-l border-gray-700"
             title="View Details"
           >
             <FiEye size={20} />
           </Link>
        </div>
      </div>

      {/* 2. Content: Small, precise typography */}
      <div className="py-3 px-1">
        {/* Brand */}
        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest block mb-1">
          {product.brand}
        </span>

        {/* Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xs md:text-[13px] font-semibold text-gray-500 dark:text-gray-600 truncate group-hover:text-yellow-500 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <p className="mt-1 text-sm md:text-base font-black text-gray-900 dark:text-yellow-500">
          ${product.price}
        </p>
      </div>
    </div>
  );
};