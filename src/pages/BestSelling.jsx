import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBestSellingProducts } from "../api/Api";
import toast from 'react-hot-toast'
import Card from "../components/Card";

const BestSelling = () => {
  // get products
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchBestSellingProducts,
  });

  // handle add to cart
  const handleAddToCard = (id) => {
    toast.success('product added')
    console.log(id);
  };
  // handle add to cart
  const handleBuyNow = (id) => {
    console.log(id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-11/12 mx-auto flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-amber-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen w-11/12 mx-auto flex justify-center items-center">
        <div className="text-red-500 text-xl">Error: {error.message}</div>
      </div>
    );
  }

  const products = data || [];

  return (
    <div className="min-h-screen w-11/12 mx-auto">
      <div className="lg:p-16 p-5 mt-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-robotoCondensed text-amber-500 text-center font-medium">
          Best Selling
        </h1>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4 lg:gap-8">
          {products.map((product) => {
            const { id, title, price, image } = product;
            return (
              // <div
              //   key={id}
              //   className="group relative bg-gray-700 rounded-lg overflow-hidden w-full hover:shadow-lg transition-all duration-300"
              // >
              //   <div className="w-full h-auto aspect-[3/4] flex justify-center items-center p-2 sm:p-4 bg-white">
              //     <img
              //       src={image}
              //       alt={title}
              //       className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              //     />
              //   </div>

              //   <div className="p-4">
              //     <h3 className="text-white font-medium truncate">{title}</h3>
              //     <p className="text-amber-500 font-bold">
              //       ${price.toFixed(2)}
              //     </p>
              //   </div>

              //   {/* Action Buttons - Always visible on mobile, shows on hover for desktop */}
              //   <div className="lg:absolute lg:bottom-0 lg:left-0 lg:right-0 p-4 bg-gray-700 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-4 lg:group-hover:translate-y-0 transition-all duration-300 flex flex-col gap-2">
              //     <button
              //       onClick={() => {
              //         handleAddToCard(id);
              //       }}
              //       className="w-full cursor-pointer bg-amber-500 text-white py-2 px-4 rounded font-medium hover:bg-amber-600 transition-colors duration-200"
              //     >
              //       Add to Cart
              //     </button>
              //     <button
              //       onClick={() => {
              //         handleBuyNow(id);
              //       }}
              //       className="w-full cursor-pointer bg-white text-gray-800 py-2 px-4 rounded font-medium hover:bg-gray-300 transition-colors duration-200"
              //     >
              //       Buy Now
              //     </button>
              //   </div>
              // </div>
              <Card id={id} title={title} price={price} image={image} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BestSelling;
