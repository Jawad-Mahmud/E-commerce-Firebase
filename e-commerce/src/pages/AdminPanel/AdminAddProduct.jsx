import React, { useState } from 'react';
import { useAddProducts } from '../../hooks/useAddProducts';
import { FiPlusSquare, FiRefreshCw, FiImage, FiTag, FiType, FiHash, FiAlignLeft, FiDollarSign } from 'react-icons/fi';
export const AdminAddProduct = () => {
  const { addProducts } = useAddProducts();
  
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addProducts({ image, name, price, brand, description, quantity });
    alert("done");
    setBrand("");
    setName("");
    setPrice("");
    setDescription("");
    setQuantity("");
    setImage("");
  };

  const clearData = () => {
    setBrand("");
    setName("");
    setPrice("");
    setDescription("");
    setQuantity("");
    setImage("");
    alert("cleared");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 shadow-2xl rounded-sm p-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight flex items-center justify-center gap-3">
            <FiPlusSquare className="text-yellow-400" /> Add New Product
          </h1>
          <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">Expand Your Luxury Collection</p>
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label className="flex items-center text-gray-400 mb-2 text-xs uppercase tracking-wider font-semibold">
                <FiType className="mr-2 text-yellow-400" /> Product Name
              </label>
              <input
                type="text"
                placeholder="e.g. Casio G-Shock Gold"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-sm focus:outline-none focus:border-yellow-400 transition-colors"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="flex items-center text-gray-400 mb-2 text-xs uppercase tracking-wider font-semibold">
                <FiDollarSign className="mr-2 text-yellow-400" /> Price (USD)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-sm focus:outline-none focus:border-yellow-400 transition-colors"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center text-gray-400 mb-2 text-xs uppercase tracking-wider font-semibold">
              <FiAlignLeft className="mr-2 text-yellow-400" /> Description
            </label>
            <textarea
              placeholder="Describe the craftsmanship and features..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-sm focus:outline-none focus:border-yellow-400 transition-colors h-28 resize-none"
              
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="flex items-center text-gray-400 mb-2 text-xs uppercase tracking-wider font-semibold">
              <FiImage className="mr-2 text-yellow-400" /> Image URL
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/watch-image.jpg"
              className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-sm focus:outline-none focus:border-yellow-400 transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category / Brand */}
            <div>
              <label className="flex items-center text-gray-400 mb-2 text-xs uppercase tracking-wider font-semibold">
                <FiTag className="mr-2 text-yellow-400" /> Brand / Category
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Naviforce"
                className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-sm focus:outline-none focus:border-yellow-400 transition-colors"
                required
              />
            </div>

            {/* Stock */}
            <div>
              <label className="flex items-center text-gray-400 mb-2 text-xs uppercase tracking-wider font-semibold">
                <FiHash className="mr-2 text-yellow-400" /> Stock Quantity
              </label>
              <input
                type="number"
                placeholder="Available units"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-sm focus:outline-none focus:border-yellow-400 transition-colors"
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
            <button
              type="submit"
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-6 rounded-sm transition-all uppercase text-sm tracking-widest shadow-xl flex items-center justify-center gap-2"
            >
              <FiPlusSquare size={18} /> Add to Inventory
            </button>
            <button
              type="button"
              className="flex-1 bg-transparent border border-gray-700 hover:border-red-500 text-gray-400 hover:text-red-500 font-bold py-4 px-6 rounded-sm transition-all uppercase text-sm tracking-widest flex items-center justify-center gap-2"
              onClick={clearData}
            >
              <FiRefreshCw size={18} /> Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};