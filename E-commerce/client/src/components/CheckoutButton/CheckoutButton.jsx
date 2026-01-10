import React from 'react'
import { usePay } from '../../hooks/usePay'

export const CheckoutButton = () => {
  const { handleCheckout } = usePay();

  return (
    <button onClick={handleCheckout} style={{ padding: '10px 20px', fontSize: '16px' }}>
      Pay with Stripe
    </button>
  );
};
