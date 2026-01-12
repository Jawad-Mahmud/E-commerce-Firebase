// src/pages/Checkout.jsx
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart, FaCreditCard } from 'react-icons/fa';
import { usePay } from '../hooks/usePay'; // Adjust path to your usePay hook
// import { useCart } from '../context/CartContext'; // Uncomment when you have cart context
import { useCart } from '../context/CartProvider';
import { useProductId } from '../hooks/useProductId';
import { useEffect } from 'react';
export const Checkout2 = () => {
      const { id } = useParams();
     useEffect(() => {
         const fetchProduct = async () => {
           const docRef = doc(db, "watches", id);
           const docSnap = await getDoc(docRef);
           if (docSnap.exists()) setProduct(docSnap.data())
         }
         fetchProduct();
       }, [id])
      
      
console.log("id",id)
  const {cartedItems,totalCartedPrice} = useCart();
  const { handleCheckout } = usePay();
  // const { cartItems, totalAmount } = useCart(); // Replace with your real cart data

  // Temporary mock data (replace with your real cart context/state)
console.log(cartedItems);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      await handleCheckout();
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-12">
          <Link
            to="/cart"
            className="inline-flex items-center text-gray-400 hover:text-yellow-400 transition duration-300"
          >
            <FaArrowLeft className="mr-2" />
            Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Order Summary */}
          <div className="lg:col-span-3">
            <h1 className="text-4xl font-serif font-bold tracking-wider text-yellow-400 mb-10">
              Checkout
            </h1>

            <div className="bg-gray-900 rounded-lg shadow-xl p-8 border border-gray-800">
              <h2 className="text-2xl font-medium mb-6 flex items-center">
                <FaShoppingCart className="mr-3 text-yellow-400" />
                Order Summary
              </h2>

              <div className="space-y-6">
                {cartedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-4 border-b border-gray-800 last:border-b-0"
                  >
                    <div className="flex items-center">
                      {/* Product Image Placeholder */}
                      <div className="w-20 h-20 bg-gray-800 rounded-md mr-4 flex items-center justify-center text-gray-500 text-xs">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">${item.price}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-800">
               <div className="flex justify-between text-lg mb-3">
                  <span>Subtotal</span>
                  <span className="text-green-400">${totalCartedPrice()}</span>
                </div>
                <div className="flex justify-between text-lg mb-3">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between text-2xl font-bold mt-6 text-yellow-400">
                  <span>Total</span>
                  <span>${totalCartedPrice()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Payment Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-lg shadow-xl p-8 border border-gray-800 sticky top-24">
              <h2 className="text-2xl font-medium mb-8 flex items-center">
                <FaCreditCard className="mr-3 text-yellow-400" />
                Payment
              </h2>

              <div className="space-y-6">
                {/* You can add shipping info, email, etc. here later */}
                <div>
                  <p className="text-gray-300 mb-4">
                    You'll be securely redirected to Stripe to complete your payment.
                  </p>
                  <p className="text-sm text-gray-500">
                    We accept all major credit/debit cards.
                  </p>
                </div>

                <button
                  onClick={handlePayment}
                  className={`
                    w-full py-5 px-8 rounded-md font-semibold text-lg tracking-wider uppercase
                    transition-all duration-300
                    ${
                      isProcessing
                        ? 'bg-gray-700 cursor-not-allowed'
                        : 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 shadow-lg shadow-yellow-500/20'
                    }
                  `}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Pay with Stripe • $' + totalCartedPrice()
                  )}
                </button>

                <p className="text-center text-sm text-gray-500 mt-6">
                  Secure payment powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

