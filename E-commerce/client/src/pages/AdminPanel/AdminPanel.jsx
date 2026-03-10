import { addDoc, collection, deleteDoc, getDocs, query, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../../firebase-config/firebase'
import { Link } from 'react-router-dom'
import { useGetProducts } from '../../hooks/useGetProducts'
import { useDeleteProducts } from '../../hooks/useDeleteProducts'
import { useCart } from '../../context/CartProvider'
import { FiPackage, FiShoppingCart, FiTrendingUp, FiEdit, FiTrash2, FiPlus, FiLayout, FiAlertTriangle, FiSearch } from 'react-icons/fi';
import { HiAdjustments } from 'react-icons/hi';

export const AdminPanel = () => {
  const { cartedItems } = useCart();
  const { products } = useGetProducts();
  const { deleteProduct } = useDeleteProducts();
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.brand?.toLowerCase().includes(search.toLowerCase())
  );

  const lowStock = products.filter(p => p.quantity < 5);

  const stats = [
    {
      label: 'Ordered Products',
      value: 2,
      icon: FiTrendingUp,
    },
    {
      label: 'Carted Products',
      value: cartedItems?.length ?? 0,
      icon: FiShoppingCart,
    },
    {
      label: 'Total Inventory',
      value: products.length,
      icon: FiPackage,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">
              Timeless Co. — Admin
            </p>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Dashboard</h1>
          </div>
          <Link
            to="/admin/add-product"
            className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-6 py-2.5 rounded-lg text-[11px] font-bold tracking-widest uppercase transition-all duration-300 shadow-sm"
          >
            <FiPlus size={15} />
            Add New Watch
          </Link>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">
                  {label}
                </p>
                <p className="text-3xl font-serif font-bold text-gray-900">{value}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                <Icon size={20} className="text-gray-500" />
              </div>
            </div>
          ))}
        </div>

        {/* ── Low Stock Alert ── */}
        {lowStock.length > 0 && (
          <div className="bg-white border border-amber-200 rounded-2xl p-4 shadow-sm flex items-start gap-3">
            <FiAlertTriangle className="text-amber-500 mt-0.5 flex-shrink-0" size={18} />
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-amber-600 mb-1">
                Low Stock Warning
              </p>
              <p className="text-sm text-gray-700">
                {lowStock.map(p => (
                  <span key={p.id} className="inline-flex items-center mr-2 mb-1 px-2 py-0.5 bg-amber-50 border border-amber-200 rounded text-[11px] font-bold text-amber-700 tracking-wide">
                    {p.name} — {p.quantity} left
                  </span>
                ))}
              </p>
            </div>
          </div>
        )}

        {/* ── Product Table ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Table Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <HiAdjustments className="text-gray-400" size={18} />
              <h2 className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                Product Inventory
              </h2>
            </div>
            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 transition placeholder-gray-300 text-gray-900 w-56"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['Watch Details', 'Brand', 'Stock', 'Unit Price', 'In Carts', 'Actions'].map((h, i) => (
                    <th
                      key={h}
                      className={`px-6 py-4 text-[10px] font-bold tracking-widest uppercase text-gray-400 ${i > 1 ? 'text-center' : ''}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => {
                  const isLow = product.quantity < 5;
                  return (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors group">

                      {/* Watch Details */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg border border-gray-200 group-hover:border-gray-400 transition"
                          />
                          <div>
                            <p className="text-sm font-bold text-gray-900 group-hover:text-gray-700 transition font-serif">
                              {product.name}
                            </p>
                            <p className="text-[10px] text-gray-400 tracking-widest uppercase mt-0.5">
                              {product.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Brand */}
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          {product.brand?.toUpperCase()}
                        </span>
                      </td>

                      {/* Stock */}
                      <td className="px-6 py-4 text-center">
                        <span className={`text-[11px] font-bold tracking-wide px-2.5 py-1 rounded-full border ${
                          isLow
                            ? 'bg-red-50 text-red-600 border-red-200'
                            : 'bg-green-50 text-green-700 border-green-200'
                        }`}>
                          {product.quantity}
                          {isLow && ' ⚠'}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-bold text-gray-900 font-serif">
                          ${product.price}
                        </span>
                      </td>

                      {/* In Carts */}
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm text-gray-500">
                          {product.totalCarted || 0}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <Link
                            to="/admin/add-home-section"
                            className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-900 transition"
                            title="Add to Home Section"
                          >
                            <FiLayout size={15} />
                          </Link>
                          <Link
                            to={`/admin/edit-product/${product.id}`}
                            className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-900 transition"
                            title="Edit Product"
                          >
                            <FiEdit size={15} />
                          </Link>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition"
                            title="Delete Product"
                          >
                            <FiTrash2 size={15} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <FiPackage className="mx-auto text-gray-300 mb-4" size={40} />
              <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                {search ? 'No products match your search' : 'No products in inventory'}
              </p>
            </div>
          )}

          {/* Footer count */}
          {filteredProducts.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
              <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};