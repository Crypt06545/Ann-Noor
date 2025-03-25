import React from "react";
import atorImg from "../assets/images/ator.png";

const BestSelling = () => {
  return (
    <div className="min-h-screen w-11/12 mx-auto">
      <div className="lg:p-16 p-5 mt-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-robotoCondensed text-amber-500 text-center font-medium">
          Best Selling
        </h1>

        {/* Card Container - Responsive grid with proper image scaling */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4 lg:gap-8">
          {[...Array(8)].map((_, index) => (
            <div 
              key={index}
              className="bg-gray-700 rounded-lg overflow-hidden w-full"
            >
              {/* Image container with responsive aspect ratio */}
              <div className="w-full h-auto aspect-[3/4] flex justify-center items-center p-2 sm:p-4">
                <img 
                  src={atorImg} 
                  alt="" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSelling;