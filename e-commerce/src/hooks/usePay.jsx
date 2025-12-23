import React from 'react'
import { getStripe } from '../Payment/getStripe';
 
export const usePay = () => {
    const handleCheckout = async () => {
    const stripe = await getStripe();

    const res = await fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
    });
    const session = await res.json();

    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return {handleCheckout}
}
