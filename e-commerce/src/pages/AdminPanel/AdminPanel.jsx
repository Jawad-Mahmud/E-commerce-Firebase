import { addDoc, collection, deleteDoc,  getDocs, query, updateDoc } from 'firebase/firestore'
import React from 'react'
import { db } from '../../firebase-config/firebase'
import { data, Link } from 'react-router-dom'
import { useGetProducts } from '../../hooks/useGetProducts'
import { useDeleteProducts } from '../../hooks/useDeleteProducts'
import { useCart } from '../../context/CartProvider'
export const AdminPanel = () => {
  
  const {cartedItems} = useCart();
  console.log(cartedItems);
  const { products } = useGetProducts();
  const {deleteProduct} = useDeleteProducts();
  
  return (
    <>
      <div className='div-1 flex justify-around'>
        <div className='h-16 bg-blue-400 w-32 flex flex-col items-center mt-5'>Ordered Products <p>2</p></div>
        <div className='h-16 bg-blue-400 w-32 flex flex-col items-center mt-5'>Carted Products <p>3</p></div>
        <div className='h-16 bg-blue-400 w-32 flex flex-col items-center mt-5'>Total Products <p>{products.length}</p></div>
      </div>
       
       <div className='div-3'>


       </div>
    
      <div className="div-3 flex justify-center mt-8">
        <table className="min-w-[600px] border border-gray-300">
          <thead>
            <tr className="bg-blue-400 text-white">
              <th className="px-6 py-3 border"> Watch Name</th>
              <th className="px-6 py-3 border">Quantity</th>
              <th className="px-6 py-3 border">Price</th>
              <th className="px-6 py-3 border">Carted</th>
               <th className="px-6 py-3 border">Delete</th>
               <th className="px-6 py-3 border">Edit</th>


            </tr>
          </thead>
          <tbody>
  {products.map((product) => (
    <tr key={product.id} className="text-center border-b">
      <td className="px-6 py-4 border">{product.name}    <img
    src={product.image}
    alt={product.name}
    className="w-16 h-16 object-cover mx-auto rounded"
  /></td>
      <td className="px-6 py-4 border">{product.quantity}</td>
      <td className="px-6 py-4 border">{product.price}</td>
<td className="px-6 py-4 border">
{product.totalCarted}
</td>
<td className="px-6 py-4 border">
  <button 
    onClick={() => deleteProduct(product.id)}
    className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold py-1 px-3 rounded transition-colors"
  >
    Delete
  </button>
</td>

<td className="px-6 py-4 border">
  <Link 
    to={`/admin/edit-product/${product.id}`}
    className="bg-orange-500 hover:bg-orange-600 active:bg-red-700 text-white font-semibold py-1 px-3 rounded transition-colors"
  >
    Edit
  </Link>


</td>
    </tr>
  ))}

          </tbody>
        </table>
      </div>

      <div className=" div-2 flex justify-between items-center px-6 py-4">
        
        <Link
          to="/admin/add-product"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Product
        </Link>
      </div>


    </>
  );
};
