import React from 'react';
import { Link } from 'react-router-dom';

export const ProductCard = ({ product, openSideBar, addToCart }) => {
  return (
    <>
      {/* Container: Adjusting widths for a more dense grid (e.g., 5-column layout on large screens) */}
      <div className="inline-block m-3 w-48 sm:w-56 md:w-52 lg:w-48 xl:w-56"> 
      
        <Link to={`/product/${product.id}`}>
          {/* Card: Dark background, subtle border, luxury hover effect */}
          {/* Note: The rounded corners and main border are on this div */}
          <div className="shadow-xl rounded-lg overflow-hidden bg-gray-900 border border-gray-700 hover:shadow-yellow-400/50 transition duration-300">
            
            {/* Image Container: NO PADDING or BACKGROUND here to remove the frame/border effect */}
            <div className=""> 
                <img
                    src={product.image}
                    alt={product.name}
                    // Height is kept h-52. Removed rounded-sm from img to allow the main rounded-lg overflow-hidden to handle the corners.
                    className="w-full h-52 object-cover opacity-90 hover:opacity-100 transition duration-300" 
                />
            </div>
            
            {/* Text Content */}
            <div className="p-3 text-center">
                {/* Brand Name */}
                <h3 className="text-xs font-light text-gray-400 uppercase tracking-widest truncate">{product.brand || 'Timeless Co.'}</h3>
                
                {/* Product Name - Smaller font size to fit more text */}
                <h4 className="mt-1 text-base font-medium text-white truncate">{product.name}</h4>
                
                {/* Price - Highlighted in yellow/gold */}
                <p className="text-lg font-bold text-yellow-400 mt-2">${product.price}</p>
            </div>
          </div>
        </Link>

        {/* --- Buttons --- */}
        <div className="mt-3 space-y-2">
            {/* Add to Cart button - Primary CTA (Yellow/Gold) */}
            <button
                className="w-full px-2 py-2 bg-yellow-400 text-gray-900 font-semibold text-xs rounded-sm hover:bg-yellow-500 transition duration-200 uppercase tracking-wider shadow-lg"
                onClick={() => {
                    addToCart(product);
                    openSideBar();
                }}
            >
                Add to Cart
            </button>
            
            {/* Secondary Button: Correctly labeled 'Quick View' with original logic */}
            <button
                className="w-full px-2 py-2 bg-gray-700 text-white font-semibold text-xs rounded-sm hover:bg-gray-600 transition duration-200 uppercase tracking-wider"
                onClick={() => {
                    addToCart(product);
                    openSideBar();
                }}
            >
                Quick View
            </button>
        </div>
        
      </div>
    </>
  );
};