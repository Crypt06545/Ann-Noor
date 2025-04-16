import React, { useState } from "react";
import { FaTrash, FaArrowLeft, FaChevronDown } from "react-icons/fa";

const Cart = () => {
  const [showAddress, setShowAddress] = useState(false);
  const products = [
    {
      name: "Running Shoes",
      description: [
        "Lightweight and comfortable",
        "Breathable mesh upper",
        "Ideal for jogging and casual wear",
      ],
      offerPrice: 250,
      price: 200,
      quantity: 1,
      size: 42,
      image:
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
      category: "Footwear",
    },
    {
      name: "Running Shoes",
      description: [
        "Lightweight and comfortable",
        "Breathable mesh upper",
        "Ideal for jogging and casual wear",
      ],
      offerPrice: 250,
      price: 200,
      quantity: 1,
      size: 42,
      image:
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage2.png",
      category: "Footwear",
    },
    {
      name: "Running Shoes",
      description: [
        "Lightweight and comfortable",
        "Breathable mesh upper",
        "Ideal for jogging and casual wear",
      ],
      offerPrice: 250,
      price: 200,
      quantity: 1,
      size: 42,
      image:
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage3.png",
      category: "Footwear",
    },
  ];

  const totalAmount = products.reduce(
    (total, product) => total + product.offerPrice * product.quantity,
    0
  );
  const tax = totalAmount * 0.02;

  return (
    <div className="min-h-screen bg-zinc-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Cart Items */}
          <div className="flex-1 bg-zinc-800 p-6 rounded-xl border border-zinc-700">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-amber-500">
                Shopping Cart
              </h1>
              <span className="text-sm bg-zinc-700 text-amber-400 px-3 py-1 rounded-full">
                {products.length} Items
              </span>
            </div>

            <div className="grid grid-cols-[2fr_1fr_1fr] text-zinc-400 text-sm font-medium pb-4 border-b border-zinc-700">
              <p className="text-left">PRODUCT DETAILS</p>
              <p className="text-center">SUBTOTAL</p>
              <p className="text-center">ACTION</p>
            </div>

            {products.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-[2fr_1fr_1fr] text-zinc-300 items-center py-5 border-b border-zinc-700 hover:bg-zinc-750 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 flex items-center justify-center border border-zinc-700 rounded-lg bg-zinc-800 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-200">
                      {product.name}
                    </p>
                    <div className="text-xs text-zinc-400 space-y-1 mt-1">
                      <p>Size: {product.size || "N/A"}</p>
                      <div className="flex items-center">
                        <span className="mr-2">Qty:</span>
                        <select
                          className="bg-zinc-700 border border-zinc-600 text-zinc-200 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-amber-500"
                          defaultValue={product.quantity}
                        >
                          {Array.from({ length: 5 }, (_, i) => i + 1).map(
                            (num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center font-medium text-amber-400">
                  ${product.offerPrice * product.quantity}
                </p>
                <div className="flex justify-center">
                  <button className="p-2 text-red-500 hover:text-red-400 hover:bg-zinc-700 rounded-full transition-colors">
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <button className="flex items-center gap-2 mt-8 text-amber-500 hover:text-amber-400 font-medium transition-colors">
              <FaArrowLeft className="w-3 h-3" />
              <span>Continue Shopping</span>
            </button>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-96 bg-zinc-800 p-6 rounded-xl border border-zinc-700 h-fit sticky top-8">
            <h2 className="text-xl font-bold text-amber-500 mb-2">
              Order Summary
            </h2>
            <p className="text-sm text-zinc-400 mb-6">
              Review your order details
            </p>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-zinc-400">
                    Delivery Address
                  </p>
                  <button
                    onClick={() => setShowAddress(!showAddress)}
                    className="text-xs text-amber-500 hover:text-amber-400 flex items-center gap-1"
                  >
                    Change{" "}
                    <FaChevronDown
                      className={`w-2 h-2 transition-transform ${
                        showAddress ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                {showAddress ? (
                  <div className="bg-zinc-750 border border-zinc-700 rounded-lg p-3 space-y-2">
                    <div
                      className="p-2 hover:bg-zinc-700 rounded cursor-pointer"
                      onClick={() => setShowAddress(false)}
                    >
                      <p className="text-zinc-200 font-medium">New York, USA</p>
                      <p className="text-xs text-zinc-400">
                        123 Broadway, NY 10001
                      </p>
                    </div>
                    <button className="w-full text-center text-amber-500 hover:text-amber-400 text-sm p-2">
                      + Add new address
                    </button>
                  </div>
                ) : (
                  <p className="text-zinc-300 bg-zinc-750 border border-zinc-700 rounded-lg p-3">
                    No address selected
                  </p>
                )}
              </div>

              <div className="mt-4 mb-4 md:mt-0 md:mb-0">
                <p className="text-sm font-medium text-zinc-400 mb-2">
                  Payment Method
                </p>
                <select className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-amber-500">
                  <option className="bg-zinc-800 text-zinc-100" value="COD">
                    Cash On Delivery
                  </option>
                  <option className="bg-zinc-800 text-zinc-100" value="Online">
                    Online Payment
                  </option>
                </select>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-700 space-y-3">
              <div className="flex justify-between text-zinc-300">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Shipping</span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Tax (2%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-amber-400 pt-3">
                <span>Total</span>
                <span>${(totalAmount + tax).toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full py-3 mt-6 bg-amber-500 hover:bg-amber-600 text-zinc-900 font-bold rounded-lg transition-colors">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
