import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { producDetails } from "../api/Api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ProductDetails = () => {
  const { currency, cartItems, addToCart, removeFromCart } = useAppContext();

  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: productDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => producDetails(id),
  });
  const product = productDetails?.data?.data;
  console.log(product);

  // const [thumbnail, setThumbnail] = useState(product.images[0]);

  return (
    product && (
      <div className="min-h-screen bg-zinc-900 text-white py-10 px-4 flex justify-center">
        <div className="max-w-6xl w-full">
          <p className="text-sm text-gray-400">
            <span className="text-gray-500">Home</span> /
            <span className="text-gray-500"> Products</span> /
            <span className="text-gray-500"> {product.category}</span> /
            <span className="text-amber-400 font-medium"> {product.name}</span>
          </p>





          <div className="flex flex-col md:flex-row gap-10 mt-6">
            {/* Thumbnails */}
            {/* <div className="flex gap-4">
              <div className="flex flex-col gap-4">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setThumbnail(image)}
                    className="border border-gray-700 rounded overflow-hidden cursor-pointer max-w-24"
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>

              <div className="border border-gray-700 rounded overflow-hidden max-w-[350px]">
                <img src={thumbnail} alt="Selected product" />
              </div>
            </div> */}

            {/* Product Info */}
            <div className="w-full md:w-1/2 text-sm">
              <h1 className="text-3xl font-semibold">{product.name}</h1>

              <div className="flex items-center gap-1 mt-2">
                {Array(5)
                  .fill("")
                  .map((_, i) =>
                    product.rating > i ? (
                      <FaStar key={i} className="text-amber-400 text-lg" />
                    ) : (
                      <FaRegStar key={i} className="text-amber-400 text-lg" />
                    )
                  )}
                <span className="ml-2 text-base text-gray-400">
                  ({product.rating})
                </span>
              </div>

              <div className="mt-6">
                <p className="line-through text-gray-500">
                  MRP: {product.price} <span>{currency}</span>
                </p>
                <p className="text-2xl font-medium text-amber-400">
                  MRP: {product.offerPrice} <span className="text-3xl">{currency}</span>
                </p>
              </div>

              <p className="text-base font-semibold mt-6">About Product</p>
              <ul className="list-disc ml-5 mt-1 text-gray-300">
                {/* {product.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))} */}
              </ul>

              <div className="flex items-center mt-8 gap-4 text-base">
                <button className="w-full py-3.5 font-medium bg-zinc-800 text-white hover:bg-zinc-700 transition">
                  Add to Cart
                </button>
                <button className="w-full py-3.5 font-medium bg-amber-500 text-black hover:bg-amber-600 transition">
                  Buy now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );

  // return <div>product details</div>;
};

export default ProductDetails;
