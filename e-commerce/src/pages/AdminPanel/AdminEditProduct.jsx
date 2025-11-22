import React, { useEffect, useState } from 'react'
import { useEditProduct } from '../../hooks/useEditProduct'
import { useParams } from 'react-router-dom';
import { useGetProducts } from '../../hooks/useGetProducts';
import { useProductId } from '../../hooks/useProductId';

export const AdminEditProduct = () => {
  const {id} = useParams();
   const {editProduct} = useEditProduct();
   const {individual} = useProductId(id);

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

   

  
     
    const onSubmit = (e) =>{
     e.preventDefault();

     const updatedData ={
    name,
    price: Number(price), // make sure price is a number
    description,
    image,
    brand,
    quantity: Number(quantity)


     }
     editProduct(individual.id,updatedData)
     alert("done")

     
    }

  return (
    <>
    <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
  <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
    Edit Product
  </h1>

  <form className="space-y-4"  onSubmit={onSubmit}>
    {/* Product Name */}
    <div>
      <label className="block text-gray-700 mb-1 font-medium">Product Name</label>
      <input
        type="text"
        value={name}
         onChange={(e)=>setName(e.target.value)}
        placeholder="Update product name"
        className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200"
      />
    </div>

    {/* Price */}
    <div>
      <label className="block text-gray-700 mb-1 font-medium">Price ($)</label>
      <input
        type="number"
        value={price}
        onChange={(e)=>setPrice(e.target.value)}

        placeholder="Update price"
        className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200"
      />
    </div>

    {/* Description */}
    <div>
      <label className="block text-gray-700 mb-1 font-medium">Description</label>
      <textarea
        placeholder="Update description"   
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200 h-24"
      ></textarea>
    </div>

    {/* Image URL */}
    <div>
      <label className="block text-gray-700 mb-1 font-medium">Image URL</label>
      <input
        type="text"
        value={image}
         onChange={(e)=>setImage(e.target.value)}

        placeholder="Update image link"
        className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200"
      />
    </div>

    {/* Category */}
    <div>
      <label className="block text-gray-700 mb-1 font-medium">Brand</label>
                         <input
                      value={brand}
         onChange={(e)=>setBrand(e.target.value)}   
           
            type="text"
            placeholder="Write brand name"
            className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200"
          />

    </div>

    {/* Stock */}
    <div>
      <label className="block text-gray-700 mb-1 font-medium">Stock</label>
      <input
        type="number"
        placeholder="Update quantity"
                value={quantity}
         onChange={(e)=>setQuantity(e.target.value)}   

        className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200"
      />
    </div>

    {/* Buttons */}
    <div className="flex justify-between mt-6">
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
      >
        Update Product
      </button>
      <button
        type="button"
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg"
      >
        Cancel
      </button>
    </div>
  </form>
</div>

    
    </>
  )
}
