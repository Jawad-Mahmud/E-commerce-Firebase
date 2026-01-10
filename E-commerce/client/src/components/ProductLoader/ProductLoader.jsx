import React from 'react'
import { ProductCard } from '../ProductCard/ProductCard';
import { useProductId } from '../../hooks/useProductId';
export const ProductLoader = ({ id, openSideBar, addToCart }) => {
  const { individual } = useProductId(id);

  if (!individual) return null;

  return (
    <ProductCard
      key={id}
      product={individual}
      openSideBar={openSideBar}
      addToCart={addToCart}
    />
  );
};
