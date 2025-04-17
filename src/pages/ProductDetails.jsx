import { useState, useEffect } from "react";
import {
  FaStar,
  FaRegStar,
  FaShoppingCart,
  FaBolt,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ProductDetails = () => {
  const [thumbnail, setThumbnail] = useState("");
  const { addToCart, currency, products } = useAppContext();
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Find the product
  const product = products.find((item) => item._id === id);

  // Use useEffect to set thumbnail when product data loads
  useEffect(() => {
    if (product?.image?.[0]) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <p className="text-zinc-400">Product not found</p>
      </div>
    );
  }

  return (
    <div className="mx-auto px-6 py-10 min-h-screen bg-zinc-900 text-zinc-200">
      <div className="w-11/12 mx-auto">
        <p className="text-zinc-400">
          <Link to={'/'}>Home</Link> /
          <Link to={'/products'}> Products</Link> /
          <Link to={`/products?category=${product.category}`}> {product.category}</Link> /
          <span className="text-amber-500"> {product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {product.image.map((image, index) => (
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
              {product.name}
            </h1>

            <div className="mt-6">
              {product.offerPrice ? (
                <>
                  <p className="text-2xl font-medium text-amber-400">
                    {currency} {product.offerPrice}
                  </p>
                  <p className="text-xl line-through text-zinc-500">
                    {currency} {product.price}
                  </p>
                </>
              ) : (
                <p className="text-2xl font-medium text-amber-400">
                  {currency} {product.price}
                </p>
              )}
              <span className="text-zinc-500">(inclusive of all taxes)</span>
            </div>

            <p className="text-base font-medium mt-6 text-amber-400">
              About Product
            </p>
            <ul className="list-disc ml-4 text-zinc-400">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button 
                onClick={() => { addToCart(product._id) }} 
                className="w-full py-3.5 cursor-pointer font-medium bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition rounded-lg flex items-center justify-center gap-2"
              >
                <FaShoppingCart /> Add to Cart
              </button>
              <button 
                onClick={() => {
                  addToCart(product._id); 
                  navigate('/cart');
                  scrollTo(0, 0);
                }} 
                className="w-full py-3.5 cursor-pointer font-medium bg-amber-500 text-zinc-900 hover:bg-amber-400 transition rounded-lg flex items-center justify-center gap-2"
              >
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