import React from "react";

export const CartSidebar = ({ showSidebar, cartedItems, cartedNumber, removeFromCart, closeSideBar, totalCartedPrice }) => {
    if (!showSidebar) return null;

    const Overlay = () => (
        <div 
            className="fixed top-0 left-0 w-full h-full bg-black/40 z-40" 
            onClick={closeSideBar}
        ></div>
    );
    
    return (
        <>
        <Overlay />
        
        <div className="fixed top-0 right-0 w-80 h-screen bg-white text-gray-800 p-5 shadow-xl flex flex-col z-50 transition-transform duration-300 transform translate-x-0">
            
            <div className="flex items-center justify-between border-b pb-4 mb-4">
                <h2 className="text-2xl font-semibold tracking-wide">
                    Shopping Cart
                </h2>

                <button 
                    onClick={closeSideBar} 
                    className="text-gray-500 hover:text-gray-900 text-2xl transition"
                    aria-label="Close Cart"
                >
                    &times;
                </button>
            </div>
            
            <span className="text-gray-500 text-sm mb-3">
                {cartedItems.length} items in cart
            </span>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {cartedItems.map((carted) => (
                    <div
                        key={carted.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:shadow-md transition"
                    >
                        <p className="text-sm font-medium truncate flex-1 mr-3">
                            {carted.name}
                        </p>

                        <div className="flex items-center space-x-1">

                            <button
                                className="w-7 h-7 flex items-center justify-center border rounded hover:bg-gray-200 font-bold transition"
                                onClick={() => cartedNumber(carted.id, "decrease")}
                            >
                                -
                            </button>

                            <span className="w-6 text-center text-sm font-semibold text-gray-900">
                                {carted.cartedQuantity}
                            </span>

                            <button
                                className="w-7 h-7 flex items-center justify-center border rounded hover:bg-gray-200 font-bold transition"
                                onClick={() => cartedNumber(carted.id, "increase")}
                            >
                                +
                            </button>

                            <button
                                onClick={() => removeFromCart(carted.id)}
                                className="ml-2 w-7 h-7 flex items-center justify-center text-white bg-gray-900 rounded hover:bg-gray-700 transition"
                                aria-label="Remove Item"
                            >
                                🗑
                            </button>
                        </div>
                    </div>
                ))}
                
                {cartedItems.length === 0 && (
                    <p className="text-center text-gray-400 pt-10">
                        Your cart is empty.
                    </p>
                )}
            </div>

            <div className="mt-6 border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-semibold">Subtotal:</p>
                    <p className="text-lg font-bold text-gray-900">
                        ${totalCartedPrice()}
                    </p>
                </div>
                
                <button className="w-full py-3 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800 transition uppercase">
                    Proceed to Checkout
                </button>
            </div>
        </div>
        </>
    );
};
