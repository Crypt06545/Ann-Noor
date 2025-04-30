import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaMinus,
  FaPlus,
  FaRegStar,
  FaStar,
} from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

// Custom Star Rating Component to replace react-rating
const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) =>
        i < rating ? (
          <FaStar key={i} className="text-amber-400 text-sm" />
        ) : (
          <FaRegStar key={i} className="text-amber-400/35 text-sm" />
        )
      )}
      <span className="ml-1 text-xs">({rating})</span>
    </div>
  );
};

const Card = ({ id, product }) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const { currency, user } = useAppContext();

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    if (!user) {
      toast.error("To add to cart you need to login first");
      return;
    }

    const newCount = count + 1;
    setCount(newCount);
    try {
      const { data } = await axiosInstance.post("/cart/add-to-cart", {
        productId: id,
        quantity: 1,
      });
      toast.success(`${product.name} added to cart`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecrease = async (e) => {
    e.stopPropagation();

    if (!user) {
      toast.error("To modify cart you need to login first");
      return;
    }

    try {
      await axiosInstance.post("/cart/decrease-quantity", {
        productId: id,
      });

      if (count > 1) {
        setCount((prev) => prev - 1);
        toast.success(`${product.name} quantity decreased`);
      } else {
        setCount(0);
        toast.success(`${product.name} removed from cart`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update cart");
    }
  };
  return (
    <div
      onClick={() => {
        navigate(`/about-products/${id}`);
        window.scrollTo(0, 0);
      }}
      className="border border-zinc-700 rounded-md px-4 py-3 bg-zinc-800 w-full cursor-pointer hover:shadow-lg hover:shadow-amber-400/10 transition-all"
    >
      {/* Product Image */}
      <div className="group flex items-center justify-center px-4 h-48 mb-3 overflow-hidden">
        <img
          className="group-hover:scale-105 transition-transform duration-300 h-full object-contain"
          src={product.images?.[0] || "https://via.placeholder.com/150"}
          alt={product.name}
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="text-zinc-400 text-sm">
        <p className="capitalize">{product.category}</p>
        <h3 className="text-zinc-200 font-medium text-lg mt-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Custom Star Rating */}
        <StarRating rating={product.rating} />

        {/* Price and Add to Cart */}
        <div className="flex items-end justify-between mt-3">
          <div>
            {product.offerPrice ? (
              <>
                <p className="text-xl md:text-2xl font-bold text-amber-400">
                  {currency} {product.offerPrice}
                </p>
                <p className="text-zinc-500 text-sm md:text-base line-through">
                  {currency} {product.price}
                </p>
              </>
            ) : (
              <p className="text-xl md:text-2xl font-bold text-amber-400">
                {currency} {product.price}
              </p>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="text-amber-400" onClick={(e) => e.stopPropagation()}>
            {count === 0 ? (
              <button
                className="flex items-center justify-center gap-2 bg-zinc-700 hover:bg-amber-400 hover:text-zinc-900 border border-amber-400 w-24 h-10 rounded-md text-amber-400 font-medium text-sm transition-colors"
                onClick={handleAddToCart}
              >
                <FaShoppingCart size={12} />
                Add
              </button>
            ) : (
              <div className="flex items-center justify-between w-24 h-10 bg-amber-400/25 rounded-md border border-amber-400">
                <button
                  onClick={handleDecrease}
                  className="h-full px-2 flex items-center text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <FaMinus size={10} />
                </button>
                <span className="text-amber-400 font-medium text-sm">
                  {count}
                </span>
                <button
                  onClick={handleAddToCart}
                  className="h-full px-2 flex items-center text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <FaPlus size={10} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
