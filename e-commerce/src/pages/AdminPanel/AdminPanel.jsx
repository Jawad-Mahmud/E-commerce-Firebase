import { addDoc, collection, deleteDoc,  getDocs, query, updateDoc } from 'firebase/firestore'
import React from 'react'
import { db } from '../../firebase-config/firebase'
import { data, Link } from 'react-router-dom'
import { useGetProducts } from '../../hooks/useGetProducts'
import { useDeleteProducts } from '../../hooks/useDeleteProducts'
import { useCart } from '../../context/CartProvider'
import { FiPackage, FiShoppingCart, FiTrendingUp, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
export const AdminPanel = () => {
  // --- Logic kept strictly identical ---
  const { cartedItems } = useCart();
  console.log(cartedItems);
  const { products } = useGetProducts();
  const { deleteProduct } = useDeleteProducts();

  return (
    <div className="min-h-screen bg-black p-4 sm:p-8 text-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Stats Section - Luxury Dark Cards with Yellow accents */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800 border-l-4 border-l-yellow-400 flex items-center justify-between">
            <div>
                <span className="text-gray-500 font-medium uppercase text-xs tracking-widest">Ordered Products</span>
                <p className="text-3xl font-bold text-yellow-400 mt-1">2</p>
            </div>
            <FiTrendingUp className="text-gray-700 text-4xl" />
          </div>
          
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800 border-l-4 border-l-yellow-400 flex items-center justify-between">
            <div>
                <span className="text-gray-500 font-medium uppercase text-xs tracking-widest">Carted Products</span>
                <p className="text-3xl font-bold text-yellow-400 mt-1">3</p>
            </div>
            <FiShoppingCart className="text-gray-700 text-4xl" />
          </div>
          
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800 border-l-4 border-l-yellow-400 flex items-center justify-between">
            <div>
                <span className="text-gray-500 font-medium uppercase text-xs tracking-widest">Total Inventory</span>
                <p className="text-3xl font-bold text-yellow-400 mt-1">{products.length}</p>
            </div>
            <FiPackage className="text-gray-700 text-4xl" />
          </div>
        </div>

        {/* 2. Header & Add Action */}
        <div className="flex flex-col sm:row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-serif font-bold text-white tracking-tight">Product Inventory</h2>
          <Link
            to="/admin/add-product"
            className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2.5 rounded-sm font-bold transition-all shadow-xl flex items-center justify-center uppercase text-sm tracking-widest"
          >
            <FiPlus className="mr-2 text-lg" /> Add New Watch
          </Link>
        </div>

        {/* 3. Table Section */}
        <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800 text-yellow-400 border-b border-gray-700">
                  <th className="px-6 py-5 font-bold uppercase text-xs tracking-widest">Watch Details</th>
                  <th className="px-6 py-5 font-bold uppercase text-xs tracking-widest text-center">Stock</th>
                  <th className="px-6 py-5 font-bold uppercase text-xs tracking-widest text-center">Unit Price</th>
                  <th className="px-6 py-5 font-bold uppercase text-xs tracking-widest text-center">In Carts</th>
                  <th className="px-6 py-5 font-bold uppercase text-xs tracking-widest text-center">Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                            <img
                            src={product.image}
                            alt={product.name}
                            className="w-14 h-14 object-cover rounded-md border border-gray-700 group-hover:border-yellow-400/50 transition-all"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-white group-hover:text-yellow-400 transition-colors">{product.name}</span>
                            <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Ref ID: {product.id.substring(0,8)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-300 font-medium">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 text-center text-yellow-400 font-bold">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-400 font-medium">
                      {product.totalCarted || 0}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center space-x-3">
                        <Link
                          to={`/admin/edit-product/${product.id}`}
                          className="flex items-center bg-gray-800 text-gray-300 hover:text-yellow-400 hover:bg-gray-700 p-2 rounded-md transition-all border border-gray-700"
                          title="Edit Product"
                        >
                          <FiEdit size={18} />
                        </Link>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="flex items-center bg-gray-800 text-gray-400 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-md transition-all border border-gray-700"
                          title="Delete Product"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {products.length === 0 && (
            <div className="p-20 text-center text-gray-600">
              <FiPackage className="mx-auto text-5xl mb-4 opacity-20" />
              <p className="uppercase tracking-widest text-sm">No products found in inventory</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};