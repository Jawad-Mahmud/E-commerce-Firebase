import React, { useEffect, useState } from 'react'
import { useGetProducts } from './useGetProducts'
export const useGetCategory = () => {
    const {products} = useGetProducts()
    const [filtered, setFiltered] = useState([])
 const [selectCategory,setSelectCategory]=useState([])
useEffect(() => {
   const filtered = products.filter(item=> selectCategory.includes(item.brand.toUpperCase()))
     setFiltered(filtered);
     console.log("filtered",filtered)
}, [selectCategory,products])

  return {filtered,setSelectCategory}
}
