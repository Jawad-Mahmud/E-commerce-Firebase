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
    <div className='flex items-center justify-center  min-h-6 mt-2'>
     <div className='relative flex items-center'>
  <FiSearch
     className={`absolute left-3 transition-all duration-500  ${focused? "opacity-0 -translate-x-2" : "opacity-100 translate-x-0" }
        
        `}
        size={18}
     
     />
     <input type="text"
     onFocus={()=> setFocused(true)}
     onBlur={()=>setFocused(false)}
     placeholder='search'
     onChange={(e)=>{setSearchText(e.target.value)}}
className={`
  border rounded-full pl-10 pr-4 py-2 outline-none border-none
  transition-all duration-300 ease-in-out
  ${focused ? "w-64 shadow-md bg-white" : "w-32 shadow-sm bg-gray-50"}
`}
     />
 {
  focused && suggestions.length>0 && searchText!=="" && (
    <div 
    className='absolute top-full left-0  bg-white shadow-lg w-64 p-2 z-50'>
  {
    suggestions.map(item=>(
      <div
      key = {item.id}
    onMouseDown={() => navigate(`/product/${item.id}`)}

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
