import React, { useState } from 'react';
import { useAddProducts } from '../../hooks/useAddProducts';
import { Link } from 'react-router-dom';
import { FiPlusSquare, FiRefreshCw, FiImage, FiTag, FiType, FiHash, FiAlignLeft, FiDollarSign, FiArrowLeft } from 'react-icons/fi';
import { HiAdjustments } from 'react-icons/hi';

export const AdminAddProduct = () => {
  const { addProducts } = useAddProducts();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const clearAll = () => {
    setBrand(""); setName(""); setPrice("");
    setDescription(""); setQuantity(""); setImage("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addProducts({ image, name, price, brand, description, quantity });
    setSubmitted(true);
    clearAll();
    setTimeout(() => setSubmitted(false), 3000);
  };

  const fields = [
    {
      label: 'Product Name', icon: FiType, col: 1,
      input: <input type="text" placeholder="e.g. Casio G-Shock Gold" value={name}
        onChange={e => setName(e.target.value)} required
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition placeholder-gray-300" />
    },
    {
      label: 'Price (USD)', icon: FiDollarSign, col: 1,
      input: <input type="number" placeholder="0.00" value={price}
        onChange={e => setPrice(e.target.value)} required
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition placeholder-gray-300" />
    },
    {
      label: 'Brand / Category', icon: FiTag, col: 1,
      input: <input type="text" placeholder="e.g. Naviforce" value={brand}
        onChange={e => setBrand(e.target.value)} required
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition placeholder-gray-300" />
    },
    {
      label: 'Stock Quantity', icon: FiHash, col: 1,
      input: <input type="number" placeholder="Available units" value={quantity}
        onChange={e => setQuantity(e.target.value)} required
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition placeholder-gray-300" />
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* ── Page Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">
              Timeless Co. — Admin
            </p>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Add New Watch</h1>
          </div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-gray-400 hover:text-gray-900 border border-gray-200 hover:border-gray-900 px-4 py-2 rounded-lg transition"
          >
            <FiArrowLeft size={13} /> Back
          </Link>
        </div>

        {/* ── Success Banner ── */}
        {submitted && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-3 flex items-center gap-3">
            <FiPlusSquare className="text-green-500 flex-shrink-0" size={16} />
            <p className="text-[11px] font-bold tracking-widest uppercase text-green-700">
              Product added to inventory successfully
            </p>
          </div>
        )}

        {/* ── Form Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Card Header */}
          <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100 bg-gray-50">
            <HiAdjustments className="text-gray-400" size={18} />
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
              Product Information
            </p>
          </div>

          <form onSubmit={onSubmit} className="p-6 sm:p-8 space-y-6">

            {/* 2-col grid fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {fields.map(({ label, icon: Icon, input }) => (
                <div key={label}>
                  <label className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">
                    <Icon size={12} />
                    {label}
                  </label>
                  {input}
                </div>
              ))}
            </div>

            {/* Image URL — full width */}
            <div>
              <label className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">
                <FiImage size={12} /> Image URL
              </label>
              <input
                type="text"
                value={image}
                onChange={e => setImage(e.target.value)}
                placeholder="https://example.com/watch-image.jpg"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition placeholder-gray-300"
              />
              {/* Image Preview */}
              {image && (
                <div className="mt-3 w-24 h-24 rounded-lg border border-gray-200 overflow-hidden">
                  <img src={image} alt="Preview" className="w-full h-full object-cover" onError={e => e.target.style.display = 'none'} />
                </div>
              )}
            </div>

            {/* Description — full width */}
            <div>
              <label className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">
                <FiAlignLeft size={12} /> Description
              </label>
              <textarea
                placeholder="Describe the craftsmanship and features..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition placeholder-gray-300 resize-none"
              />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg text-[11px] tracking-widest uppercase transition-all duration-300 shadow-sm"
              >
                <FiPlusSquare size={15} />
                Add to Inventory
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="flex-1 inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-red-300 text-gray-400 hover:text-red-500 hover:bg-red-50 font-bold py-3 px-6 rounded-lg text-[11px] tracking-widest uppercase transition-all duration-300"
              >
                <FiRefreshCw size={15} />
                Clear Form
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};