import React from "react";

export const CartSidebar = ({ showSidebar, cartedItems, cartedNumber, removeFromCart, closeSideBar, totalCartedPrice }) => {
    if (!showSidebar) return null;
 console.log("this is carted",cartedItems);
    console.log("carted number",cartedNumber)

    // A dark overlay background for a more sophisticated look (optional but recommended)
    const Overlay = () => (
        <div 
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40" 
            onClick={closeSideBar}
        ></div>
    );
    
    return (
        <>
        {/* Optional: Darkens the background when the sidebar is open */}
        <Overlay />
        
        {/* Main Sidebar - Dark background to match Navbar */}
        <div className="fixed top-0 right-0 w-80 h-screen bg-gray-900 text-white p-5 shadow-2xl flex flex-col z-50 transition-transform duration-300 transform translate-x-0">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-4">
                <h2 className="text-2xl font-semibold tracking-wider text-yellow-400">Shopping Cart</h2>
                <button 
                    onClick={closeSideBar} 
                    className="text-gray-400 hover:text-yellow-400 text-xl transition"
                    aria-label="Close Cart"
                >
                    &times; {/* Use a standard close symbol for elegance */}
                </button>
            </div>
            
            <span className="text-gray-400 text-sm mb-3">
                {cartedItems.length} items currently in cart
            </span>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1"> {/* Added pr-1 for scrollbar room */}
                {cartedItems.map((carted) => (
                    <div
                        key={carted.id}
                        className="flex items-center justify-between p-3 bg-gray-800 rounded shadow-md border border-gray-700"
                    >
                        {/* Product Name */}
                        <p className="text-sm font-medium truncate flex-1 mr-3 text-gray-200">{carted.name}</p>

                        {/* Quantity Controls & Delete */}
                        <div className="flex items-center space-x-1">
                            {/* Decrease Button */}
                            <button
                                className="w-6 h-6 flex items-center justify-center bg-gray-700 text-white rounded hover:bg-gray-600 transition text-sm font-bold"
                                onClick={() => cartedNumber(carted.id, "decrease")}
                            >
                                -
                            </button>

                            <span className="w-6 text-center text-sm font-bold text-yellow-400">
                                {carted.cartedQuantity}
                            </span>

                            {/* Increase Button */}
                            <button
                                className="w-6 h-6 flex items-center justify-center bg-gray-700 text-white rounded hover:bg-gray-600 transition text-sm font-bold"
                                onClick={() => cartedNumber(carted.id, "increase")}
                            >
                                +
                            </button>

                            {/* Delete Button */}
                            <button
                                onClick={() => removeFromCart(carted.id)}
                                className="ml-3 w-6 h-6 flex items-center justify-center bg-red-600 text-white rounded hover:bg-red-700 transition text-xs"
                                aria-label="Remove Item"
                            >
                                🗑
                            </button>
                        </div>
                    </div>
                ))}
                
                {cartedItems.length === 0 && (
                    <p className="text-center text-gray-500 pt-10">Your cart is empty.</p>
                )}
            </div>

            {/* Footer / Checkout */}
            <div className="mt-6 border-t border-gray-700 pt-4">
                <div className="flex justify-between items-center mb-3">
                    <p className="text-lg font-semibold text-gray-200">Subtotal:</p>
                    <p className="text-lg font-bold text-yellow-400">${totalCartedPrice()}</p>
                </div>
                
                <button className="mt-2 w-full py-3 bg-yellow-400 text-gray-900 font-bold rounded hover:bg-yellow-500 transition text-md tracking-wider uppercase">
                    Proceed to Checkout
                </button>
            </div>
        </div>
        </>
    );
};