import React from "react";

export const CartSidebar = ({ showSidebar, cartedItems, cartedNumber,removeFromCart,closeSideBar,totalCartedPrice }) => {
  if (!showSidebar) return null;
   
  return (
    <div className="fixed top-0 right-0 w-80 h-screen bg-gray-100 p-5 shadow-lg flex flex-col" >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">🛒 Cart</h2>
        <span className="text-gray-500 text-sm">{cartedItems.length} items</span>
       <button onClick={closeSideBar} className="text-gray-500 text-sm">Back</button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {cartedItems.map((carted) => (
          <div
            key={carted.id}
            className="flex items-center justify-between p-2 bg-white rounded shadow-sm"
          >
            {/* Product Name */}
            <p className="text-sm font-medium truncate flex-1 mr-3">{carted.name}</p>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-1">
              <button
                className="w-7 h-7 flex items-center justify-center bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                onClick={() => cartedNumber(carted.id, "decrease")}
              >
                -
              </button>

              <span className="w-6 text-center text-sm font-semibold">
                {carted.cartedQuantity}
              </span>

              <button
                className="w-7 h-7 flex items-center justify-center bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                onClick={() => cartedNumber(carted.id, "increase")}
              >
                +
              </button>

              {/* Delete Button */}
              <button
               onClick={()=> removeFromCart(carted.id)}
                className="ml-2 w-7 h-7 flex items-center justify-center bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Checkout */}
      <div className="mt-4 border-t pt-3">
        <p className="font-semibold text-sm">Total: {totalCartedPrice()}$</p> {/* placeholder */}
        <button className="mt-2 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
          Checkout
        </button>
      </div>
    </div>
  );
};
