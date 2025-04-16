import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBestSellingProducts } from "../api/Api";
import toast from "react-hot-toast";
import Card from "../components/Card";

const BestSelling = () => {
  // get products
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchBestSellingProducts,
  });

  // handle add to cart
  const handleAddToCard = (id) => {
    toast.success("product added");
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

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
        
            <Card
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSelling;
