import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react"; // Changed to useEffect
import {
  FaStar,
  FaRegStar,
  FaShoppingCart,
  FaBolt,
  FaSpinner,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../api/Api";
import { useAppContext } from "../context/AppContext";

const ProductDetails = () => {

  const {addToCart,currency} = useAppContext()
  const { id } = useParams();
  const navigate = useNavigate()
  // Fetch product details
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetails(id),
  });

  const [thumbnail, setThumbnail] = useState("");

  // Use useEffect to set thumbnail when product data loads
  useEffect(() => {
    if (product?.image) {
      setThumbnail(product.image);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <FaSpinner className="animate-spin text-amber-500 text-4xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <p className="text-zinc-400">Product not found</p>
      </div>
    );
  }

  // Convert description string to array of bullet points
  const descriptionPoints = product.description
    ? product.description.split(". ").filter((point) => point.trim() !== "")
    : [];

  // Create a single-image array for the gallery (FakeStoreAPI only provides one image)
  const productImages = product?.image ? [product?.image] : [];

  return (
    <div className="mx-auto px-6 py-10 min-h-screen bg-zinc-900 text-zinc-200">
      <div className="w-11/12 mx-auto">
        <p className="text-zinc-400">
          <Link to={'/'}>Home</Link> /
          <Link to={'/products'}> Products</Link> /
          <Link> {product.category}</Link> /
          <span className="text-amber-500"> {product.title}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className={`border max-w-24 rounded overflow-hidden cursor-pointer transition-all ${
                    thumbnail === image ? "border-amber-500" : "border-zinc-700"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="border border-zinc-700 max-w-100 rounded-lg overflow-hidden bg-zinc-800">
              {thumbnail && (
                <img
                  src={thumbnail}
                  alt="Selected product"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium text-amber-400">
              {product.title} {/* Changed from name to title */}
            </h1>

            <div className="flex items-center gap-0.5 mt-1">
              {Array(5)
                .fill("")
                .map((_, i) =>
                  product.rating?.rate > i ? ( // Changed to rating.rate
                    <FaStar key={i} className="text-amber-400" />
                  ) : (
                    <FaRegStar key={i} className="text-amber-400 opacity-35" />
                  )
                )}
              <p className="text-base ml-2 text-zinc-300">
                ({product.rating?.rate})
              </p>{" "}
              {/* Changed to rating.rate */}
            </div>

            <div className="mt-6">
              <p className="text-2xl font-medium text-amber-400">
                ${product.price} {/* FakeStoreAPI doesn't have offerPrice */}
              </p>
              <span className="text-zinc-500">(inclusive of all taxes)</span>
            </div>

            <p className="text-base font-medium mt-6 text-amber-400">
              About Product
            </p>
            <ul className="list-disc ml-4 text-zinc-400">
              {descriptionPoints.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button onClick={()=>{addToCart(product.id)}} className="w-full py-3.5 cursor-pointer font-medium bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition rounded-lg flex items-center justify-center gap-2">
                <FaShoppingCart /> Add to Cart
              </button>
              <button onClick={()=>{addToCart(product.id); navigate('/cart');scrollTo(0,0)}} className="w-full py-3.5 cursor-pointer font-medium bg-amber-500 text-zinc-900 hover:bg-amber-400 transition rounded-lg flex items-center justify-center gap-2">
                <FaBolt /> Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
