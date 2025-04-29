import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { producDetails } from "../api/Api";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { LoadingSpinner } from "../components/LoadingSpinner";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { currency ,user} = useAppContext();
  const { id } = useParams();

  // Initialize state for thumbnail
  const [thumbnail, setThumbnail] = useState("");

  const {
    data: productDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => producDetails(id),
  });

  const product = productDetails?.data?.data;


  const addToCart = async()=>{
    if (!user) {
      toast.error("To add to cart you need to login first");
    }
  }

  if (isLoading) return <LoadingSpinner/>;
  if (isError) return <div className="min-h-screen flex items-center justify-center text-red-500">Error loading product details</div>;

  return product ? (
    <div className="min-h-screen bg-zinc-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-zinc-400 mb-6">
          <span>Home</span> / <span>Products</span> / <span>{product.category}</span> / <span className="text-amber-500">{product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border max-w-24 border-zinc-700 rounded overflow-hidden cursor-pointer hover:border-amber-400 transition-colors"
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <div className="border border-zinc-700 max-w-100 rounded overflow-hidden">
              <img 
                src={thumbnail || product.images[0]} 
                alt="Selected product" 
                className="w-full h-auto max-h-[500px] object-contain"
              />
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2 text-zinc-200">
            <h1 className="text-3xl font-medium text-amber-400">{product.name}</h1>

            <div className="flex items-center gap-0.5 mt-1">
              {Array(5).fill('').map((_, i) => (
                product.rating > i ? (
                  <FaStar key={i} className="text-amber-400 text-lg" />
                ) : (
                  <FaRegStar key={i} className="text-amber-400 text-lg" />
                )
              ))}
              <p className="text-base ml-2">({product.rating})</p>
            </div>

            <div className="mt-6">
              <p className="text-zinc-500 line-through">MRP: {product.price} <span>{currency}</span></p>
              <p className="text-2xl font-medium text-amber-400">MRP: {product.offerPrice} <span>{currency}</span></p>
              <span className="text-zinc-500">(inclusive of all taxes)</span>
            </div>

            <p className="text-base font-medium mt-6 text-amber-400">About Product</p>
            {product.description && product.description.length > 0 ? (
              <ul className="list-disc ml-4 text-zinc-400">
                {product.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            ) : (
              <p className="text-zinc-500">No description available</p>
            )}

            <div className="flex items-center mt-10 gap-4 text-base">
              <button onClick={addToCart} className="w-full py-3.5 cursor-pointer font-medium bg-zinc-800 text-amber-400 hover:bg-zinc-700 transition border border-zinc-700">
                Add to Cart
              </button>
              <button className="w-full py-3.5 cursor-pointer font-medium bg-amber-500 text-zinc-900 hover:bg-amber-600 transition">
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center text-zinc-400">Product not found</div>
  );
};

export default ProductDetails;