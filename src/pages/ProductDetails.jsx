import React, { useState } from "react";
import ator from "../assets/images/ator.png";
import atorR from "../assets/images/atorsec.png";

import SwiperSlider from "../components/SwipperSlide";
import { FaMinus, FaPlus } from "react-icons/fa";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("100ml"); // State for selected size
  const images = [ator, atorR];

  // Size options with their corresponding images and labels
  const sizeOptions = [
    { size: "100ml", image: ator },
    { size: "150ml", image: atorR },
  ];

  return (
    <div className="bg-zinc-900 min-h-screen p-5 lg:p-16 flex justify-center items-center">
      <div className="w-full max-w-6xl">
        {/* Product Details Section */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {/* Left: Image Slider */}
          <div className="h-[400px] w-[400px] flex justify-center items-center">
            <SwiperSlider images={images} />
          </div>

          {/* Right: Product Info */}
          <div className="text-white flex flex-col space-y-6">
            <h1 className="text-4xl font-bold text-emerald-500">
              Luxurious Elixir
            </h1>
            <p className="text-gray-400 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus natus doloribus impedit odit, nam corporis aspernatur!
              A in eveniet iste!
            </p>

            {/* Rating */}
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-amber-500 text-lg">★★★★★</span>
              <span className="text-gray-400 text-sm">(90 Reviews)</span>
            </div>

            {/* Stock Availability */}
            <div className="text-green-400 font-semibold mt-2">In Stock</div>

            {/* Size Selection */}
            <div className="flex space-x-3 mt-4">
              {sizeOptions.map((option) => (
                <div key={option.size} className="flex flex-col items-center">
                  <button
                    className={`border-2 rounded-lg p-1 transition duration-200 ${
                      selectedSize === option.size
                        ? "border-emerald-500 shadow-lg shadow-emerald-500/50"
                        : "border-gray-600 hover:border-emerald-500"
                    }`}
                    onClick={() => setSelectedSize(option.size)}
                  >
                    <img
                      src={option.image}
                      alt={option.size}
                      className="h-20 w-16 object-cover" // Adjust image size as needed
                    />
                  </button>
                  <span className="text-gray-400 text-sm mt-2">
                    {option.size}
                  </span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="text-2xl text-emerald-500 font-bold mt-4">
              $250.00
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 mt-4">
              <span className="text-lg">Qty</span>
              <div className="flex items-center border border-gray-600 rounded-lg px-3">
                <button
                  className="px-3 text-lg font-bold hover:text-emerald-500 transition"
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                >
                  <FaMinus className="text-sm" />
                </button>
                <span className="px-4 text-lg">{quantity}</span>
                <button
                  className="px-3 text-lg font-bold hover:text-emerald-500 transition"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  <FaPlus className="text-sm" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-5">
              {/* Add to Bag Button */}
              <button className="bg-emerald-500 text-black font-semibold py-3 rounded-lg text-lg hover:bg-emerald-700 transition duration-200 w-full">
                Add to Bag
              </button>

              {/* Wishlist Button */}
              <button className="border-2 border-gray-600 px-5 py-2 rounded-lg flex items-center justify-center hover:bg-emerald-500 hover:text-black transition duration-200 w-full">
                ❤️ Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
