import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CartSidebar } from '../Sidebar/CartSidebar';
import { useCart } from '../../context/CartProvider';
export const ProductCard = ({ product,openSideBar,addToCart }) => {
  return (
    <>
      {/* Parent container for card + button */}
      <div className="inline-block m-4 w-80">
      
        <Link to={`/product/${product.id}`}>
          <div className="shadow-2xl rounded-lg overflow-hidden bg-white p-4 text-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-52 object-cover rounded"
            />
            <h3 className="mt-3 text-base font-medium">{product.name}</h3>
            <p className="text-gray-700 text-sm mt-1">${product.price}</p>
          </div>
        </Link>

        {/* Add to Cart button */}
        <button
          className="mt-3 w-full px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 shadow-2xl"
          onClick={()=>
          { 
            addToCart(product);
            openSideBar();
          }
          }

        >
          Add to Cart
        </button>
                <button
          className="mt-3 w-full px-3 py-2 bg-black text-white text-sm rounded hover:bg-gray-700 shadow-2xl"
          onClick={()=>
          { 
            addToCart(product);
            openSideBar();
          }
          }

        >
         Order
        </button>
        
      </div>

    
    </>
  );
};
