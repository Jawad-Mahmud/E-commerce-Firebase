import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEye } from 'react-icons/fi';

export const ProductCard = ({ product, openSideBar, addToCart }) => {
  return (
    <div className="group w-full max-w-[170px] sm:max-w-[190px] lg:max-w-[170px] mx-6 bg-white flex flex-col border border-gray-200 rounded-2xl transition-shadow duration-300 hover:shadow-lg">

      
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 border border-gray-200 rounded-2xl">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Quick Action Overlay */}
        <div className="absolute bottom-0 left-0 right-0 flex translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
          <button 
            onClick={() => { addToCart(product); openSideBar(); }}
            className="flex-1 bg-gray-900 text-white py-3 flex justify-center items-center hover:bg-gray-700 transition-colors"
            title="Add to Cart"
          >
            <FiPlus size={20} />
          </button>
          <Link 
            to={`/product/${product.id}`}
            className="flex-1 bg-white text-gray-900 py-3 flex justify-center items-center hover:bg-gray-200 transition-colors border-l border-gray-600"
            title="View Details"
          >
            <FiEye size={20} />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="py-3 px-1">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
          {product.brand}
        </span>

        <Link to={`/product/${product.id}`}>
          <h3 className="text-xs md:text-[13px] font-semibold text-gray-900 truncate group-hover:text-gray-700 transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1 text-sm md:text-base font-black text-gray-900">
          ${product.price}
        </p>
      </div>

    </div>
  );
};

