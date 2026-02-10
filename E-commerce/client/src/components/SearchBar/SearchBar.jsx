import React, { useEffect, useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { useGetProducts } from '../../hooks/useGetProducts';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';


export const SearchBar = () => {
  const navigate = useNavigate();
  const [focused, setFocused] = useState(false);
  const { products } = useGetProducts();
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!products) return;
    const searchingItem = () => {
      const filtered = products.filter(p =>
        p.name.toLowerCase().startsWith(searchText.toLowerCase())
      );
      setSuggestions(filtered);
    };
    searchingItem();
  }, [searchText, products]);

  return (
    <div className="flex items-center justify-center mt-0">
      <div className="relative flex items-center w-full max-w-[300px]">

        {/* Search Icon */}
        <FiSearch
          className={`absolute left-3 text-gray-400 transition-all duration-500 
            ${focused ? "opacity-0 -translate-x-2" : "opacity-100 translate-x-0"}`}
          size={18}
        />

        {/* Input Field */}
        <input
          type="text"
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search..."
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          className={`
            w-full border rounded-full pl-10 pr-4 py-2 outline-none text-gray-900 
            bg-white border-gray-200 shadow-sm placeholder-gray-400
            transition-all duration-300 ease-in-out
            ${focused ? "shadow-lg border-gray-900" : ""}
          `}
        />

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {focused && suggestions.length > 0 && searchText !== "" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 bg-white border border-gray-200 shadow-lg w-full p-2 z-50 rounded-lg mt-2"
            >
              {suggestions.map(item => (
                <div
                  key={item.id}
                  onMouseDown={() => {
                    navigate(`/product/${item.id}`);
                    setSearchText("");
                  }}
                  className="py-2 px-3 text-gray-900 text-sm cursor-pointer rounded hover:bg-gray-100 transition duration-150"
                >
                  {item.name}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
