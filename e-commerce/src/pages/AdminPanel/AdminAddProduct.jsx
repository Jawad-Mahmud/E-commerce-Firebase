import React, { useState } from 'react';
import { useAddProducts } from '../../hooks/useAddProducts';

export const AdminAddProduct = () => {
  const {addProducts} = useAddProducts();
  
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addProducts({ image, name, price, brand, description, quantity});
    alert("done");
    setBrand("");
    setName("");
    setPrice("")
    setDescription("");
    setQuantity("");
    setImage("")
    
  };

  const clearData = (e) =>{
     setBrand("");
    setName("");
    setPrice("")
    setDescription("");
    setQuantity("");
    setImage("");
    alert("cleared")

  }

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Add New Product
      </h1>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Price ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Description</label>
          <textarea
            placeholder="Write short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200 h-24"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Paste image link"
            className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200"
          />
        </div>


        <div>
          <label className="block text-gray-700 mb-1 font-medium">Category</label>
                    <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Write brand name"
            className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200"
          />

        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Stock</label>
          <input
            type="number"
            placeholder="Available quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Submit Product
          </button>
          <button
            type="reset"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg"
            onClick={()=>{clearData()}}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};
