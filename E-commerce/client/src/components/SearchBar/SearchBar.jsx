import React, { useEffect, useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { useGetProducts } from '../../hooks/useGetProducts';
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
  const navigate = useNavigate();
  const [focused, setFocused] = useState(false);
  const {products} = useGetProducts();
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if(!products) return;
    const searchingItem=()=>{
      const filtered = products.filter(p=> p.name.toLowerCase().startsWith(searchText.toLowerCase()));
      console.log(filtered);
      setSuggestions(filtered)
    }
    searchingItem();
  }, [searchText,products])


  return (
    <>
    {/* Container: Changed min-h-6 mt-2 to just mt-0 for cleaner alignment in the Navbar */}
    <div className='flex items-center justify-center mt-0'> 
      <div className='relative flex items-center'>
        
        {/* Search Icon: Changed color to gray/yellow for theme match */}
        <FiSearch
          className={`absolute left-3 transition-all duration-500 text-gray-400 
            ${focused? "opacity-0 -translate-x-2" : "opacity-100 translate-x-0" }
          `}
          size={18}
        />
        
        {/* Input Field: Dark background, light text, focused yellow border */}
        <input 
          type="text"
          onFocus={()=> setFocused(true)}
          // Use onBlur capture/delay if the suggestion list is tricky to click
          onBlur={()=>setTimeout(() => setFocused(false), 100)} 
          placeholder='Search...'
          onChange={(e)=>{setSearchText(e.target.value)}}
          value={searchText}
          className={`
            /* Base Style */
            border rounded-full pl-10 pr-4 py-2 outline-none text-gray-100 
            bg-gray-800 placeholder-gray-400
            
            /* Transition */
            transition-all duration-300 ease-in-out
            
            /* Focus/Unfocus Width and Shadow */
            ${focused 
              ? "w-64 shadow-md shadow-yellow-400/30 border-yellow-400/50" 
              : "w-40 shadow-sm border-gray-700" /* Slightly increased width from 32 */
            }
          `}
        />
        
        {/* Suggestions Dropdown: Dark background, yellow hover accent */}
        {
          focused && suggestions.length > 0 && searchText !== "" && (
            <div 
              className='absolute top-full left-0 bg-gray-900 border border-gray-700 shadow-xl w-64 p-2 z-50 rounded-lg mt-2'
            >
              {
                suggestions.map(item => (
                  <div
                    key = {item.id}
                    onMouseDown={() => { 
                      navigate(`/product/${item.id}`);
                      // Optional: Clear search text and close suggestions on click
                      setSearchText(""); 
                    }}
                    className='py-2 px-3 text-gray-300 text-sm cursor-pointer rounded hover:bg-gray-800 hover:text-yellow-400 transition duration-150'
                  >
                    {item.name}
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    </div>
    </>
  )
}