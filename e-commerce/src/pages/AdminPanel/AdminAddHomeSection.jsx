import React, { useState } from 'react';
import { useAddHomeSection } from '../../hooks/useAddHomeSection';
import { FiLayout, FiList, FiPlusCircle, FiTrash2, FiType } from 'react-icons/fi';
import { SearchBar } from '../../components/SearchBar/SearchBar';


export const AdminAddHomeSection = () => {

    const { addHomeSection } = useAddHomeSection();
    const [items, setItems] = useState([]);
    const [title, setTitle] = useState("");
    const [count, setCount] = useState(0);

    const handleChange = (index,value)=>{
      setItems(prev=>{
        const updated = [...prev]
        updated[index]=value
        return updated
      })
    }

    const onSubmit = (e) => {
        e.preventDefault(); // Fixed: Added preventDefault to handle form submission properly
        addHomeSection({ items, title });
        alert("Section Added to Home Page");
    };

    const handleClear = (e) => {
        e.preventDefault();
        setTitle("");
        setCount(0);
        setItems([]);
        alert("Cleared");
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 shadow-2xl rounded-sm p-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-serif font-bold text-white tracking-tight flex items-center justify-center gap-3">
                        <FiLayout className="text-yellow-400" /> Home Section Control
                    </h1>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">Manage Featured Collections</p>
                </div>
                   <SearchBar/>
                <form onSubmit={onSubmit} className="space-y-8">
                    {/* Section Title */}
                    <div>
                        <label className="flex items-center text-gray-400 mb-2 text-xs uppercase tracking-wider font-semibold">
                            <FiType className="mr-2 text-yellow-400" /> Section Title
                        </label>
                        <input 
                            type="text" 
                            placeholder="e.g. Featured Collection or New Arrivals"
                            className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-sm focus:outline-none focus:border-yellow-400 transition-colors"
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                    </div>

                    {/* Count Input */}
                    <div>
                        <label className="flex items-center text-gray-400 mb-2 text-xs uppercase tracking-wider font-semibold">
                            <FiList className="mr-2 text-yellow-400" /> Number of Products to Feature
                        </label>
                        <input 
                            type="number" 
                            placeholder="How many watches?"
                            className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-sm focus:outline-none focus:border-yellow-400 transition-colors"
                            onChange={(e) => setCount(Number(e.target.value))}
                            
                        />
                    </div>

                    {/* Dynamic Inputs Container */}

                  {count > 0 && (
        <div className="bg-gray-800 p-4 border border-gray-700 rounded max-h-60 overflow-y-auto space-y-3">
          <p className="text-[10px] uppercase tracking-widest text-yellow-400 mb-2 font-bold">
            Enter Product IDs
          </p>

          {[...Array(count)].map((_, i) => (
            <div key={i} className="flex flex-col">
              <label className="text-[10px] text-gray-400 mb-1">
                Product ID {i + 1}
              </label>
              <input
                type="text"
                className="bg-black border border-gray-700 text-white p-2 rounded focus:border-yellow-400 outline-none"
                placeholder="Product ID"
                onChange={(e) => handleChange(i, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}



                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
                        <button 
                            type="submit"
                            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-6 rounded-sm transition-all uppercase text-sm tracking-widest shadow-xl flex items-center justify-center gap-2"
                        >
                            <FiPlusCircle size={18} /> Add to Home Page
                        </button>
                        <button 
                            type="button" 
                            onClick={handleClear}
                            className="flex-1 bg-transparent border border-gray-700 hover:border-red-500 text-gray-400 hover:text-red-500 font-bold py-4 px-6 rounded-sm transition-all uppercase text-sm tracking-widest flex items-center justify-center gap-2"
                        >
                            <FiTrash2 size={18} /> Clear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};