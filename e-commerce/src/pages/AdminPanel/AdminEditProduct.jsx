import React, { useEffect, useState } from 'react'
import { useEditProduct } from '../../hooks/useEditProduct'
import { useParams } from 'react-router-dom';
import { useGetProducts } from '../../hooks/useGetProducts';
import { useProductId } from '../../hooks/useProductId';
import { FiEdit3, FiX, FiImage, FiTag, FiType, FiHash, FiAlignLeft, FiDollarSign } from 'react-icons/fi';
export const AdminEditProduct = () => {
  const { id } = useParams();
  const { editProduct } = useEditProduct();
  const { individual } = useProductId(id);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (individual) {
      setImage(individual.image || "");
      setName(individual.name || "");
      setPrice(individual.price || "");
      setDescription(individual.description || "");
      setBrand(individual.brand || "");
      setQuantity(individual.quantity || "");
    }
  }, [individual]);

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      name,
      price: Number(price), // make sure price is a number
      description,
      image,
      brand,
      quantity: Number(quantity)
    };

    editProduct(individual.id, updatedData);
    alert("done");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 shadow-2xl rounded-sm p-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight flex items-center justify-center gap-3">
            <FiEdit3 className="text-yellow-400" /> Edit Product
          </h1>
          <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">Update Asset Details</p>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Update product name"
                className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-sm focus:outline-none focus:border-yellow-400 transition-colors"
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
                placeholder="Update price"
                className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-sm focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center text-gray-400 mb-2 text-xs uppercase tracking-wider font-semibold">
              <FiAlignLeft className="mr-2 text-yellow-400" /> Description
            </label>
            <textarea
              placeholder="Update description"
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
              placeholder="Update image link"
              className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-sm focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Brand */}
            <div>
              <label className="flex items-center text-gray-400 mb-2 text-xs uppercase tracking-wider font-semibold">
                <FiTag className="mr-2 text-yellow-400" /> Brand
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Write brand name"
                className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-sm focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="flex items-center text-gray-400 mb-2 text-xs uppercase tracking-wider font-semibold">
                <FiHash className="mr-2 text-yellow-400" /> Stock
              </label>
              <input
                type="number"
                placeholder="Update quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-sm focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
            <button
              type="submit"
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-6 rounded-sm transition-all uppercase text-sm tracking-widest shadow-xl flex items-center justify-center gap-2"
            >
              <FiEdit3 size={18} /> Update Product
            </button>
            <button
              type="button"
              className="flex-1 bg-transparent border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white font-bold py-4 px-6 rounded-sm transition-all uppercase text-sm tracking-widest flex items-center justify-center gap-2"
              onClick={() => window.history.back()}
            >
              <FiX size={18} /> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};