import React from 'react';
import { Link } from 'react-router-dom';

export const ProductCard = ({ product, openSideBar, addToCart }) => {
  return (
    <>
      <div className="inline-block m-4 w-full sm:w-80 md:w-72 lg:w-64 xl:w-72">

        <Link to={`/product/${product.id}`}>
          <div className="shadow-xl rounded-lg overflow-hidden bg-gray-900 hover:shadow-yellow-400/50 transition duration-300">

            <div className="p-2 ">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-sm opacity-90 hover:opacity-100 transition duration-300"
                />
            </div>

            <div className="p-4 text-center">
                <h3 className="text-sm font-light text-gray-400 uppercase tracking-widest truncate">{product.brand || 'Timeless Co.'}</h3>

                <h4 className="mt-1 text-lg font-medium text-white truncate">{product.name}</h4>

                <p className="text-xl font-bold text-yellow-400 mt-2">${product.price}</p>
            </div>
          </div>
        </Link>

        <div className="mt-4 space-y-3">
            <button
                className="w-full px-3 py-3 bg-yellow-400 text-gray-900 font-semibold text-sm rounded-sm hover:bg-yellow-500 transition duration-200 uppercase tracking-wider shadow-lg"
                onClick={() => {
                    addToCart(product);
                    openSideBar();
                }}
            >
                Add to Cart
            </button>

            <button
                className="w-full px-3 py-3 bg-gray-700 text-white font-semibold text-sm rounded-sm hover:bg-gray-600 transition duration-200 uppercase tracking-wider"

            >
                Order Now
            </button>
        </div>

      </div>
    </>
  );
};