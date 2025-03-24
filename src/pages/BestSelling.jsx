import React from "react";
import atorImg from "../assets/images/ator.png";


const BestSelling = () => {
  return (
    <div className="min-h-screen w-11/12 mx-auto">
      <div className="lg:p-16 p-5 mt-10">
        <h1 className="text-5xl font-robotoCondensed text-amber-500 text-center font-medium">
          Best Selling
        </h1>

        {/* Card Container */}
        <div className="mt-20 border grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-gray-700 rounded-lg">
            <div className="flex justify-center items-center"><img src={atorImg} alt="" /></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BestSelling;
