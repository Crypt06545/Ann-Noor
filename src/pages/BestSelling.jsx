import React from "react";
import Card from "../components/Card";
import { useQuery } from "@tanstack/react-query";
import { fetchBestSellingProducts } from "../api/Api";
import { LoadingSpinner } from "../components/LoadingSpinner";

const BestSelling = () => {
  const { data: bestSellingData, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchBestSellingProducts,
  });

  // safely access the products
  const products = bestSellingData?.data?.data || [];

  if (isLoading) return <LoadingSpinner/>;
  if (isError) return <div>Error fetching products</div>;

  return (
    <div className="min-h-screen w-11/12 mx-auto">
      <div className="lg:p-16 p-5 mt-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-robotoCondensed text-amber-500 text-center font-medium">
          Best Selling
        </h1>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            
            <Card
              product={product}
              key={product._id}
              id={product._id}
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
