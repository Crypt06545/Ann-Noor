import { useAppContext } from "../context/AppContext";
import { FaStar, FaRegStar, FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Card = ({ id, product }) => {
  const { currency, cartItems, addToCart, removeFromCart } = useAppContext();
  const navigate = useNavigate();

  // Calculate discount percentage if offer exists
  const discountPercentage = product.offerPrice 
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  return (
    <div 
      onClick={() => {
        navigate(`/about-products/${id}`);
        scrollTo(0, 0);
      }} 
      className="border border-zinc-700 rounded-lg p-4 bg-zinc-800 w-full h-full flex flex-col hover:shadow-md transition-shadow cursor-pointer relative"
    >
      {/* Discount Badge - Shows only when offerPrice exists */}
      {product.offerPrice && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
          {discountPercentage}% OFF
        </div>
      )}

      {/* Product Image */}
      <div className="group flex items-center justify-center h-48 md:h-56 lg:h-64 mb-4">
        <img
          className="group-hover:scale-105 transition-transform duration-300 h-full object-contain"
          src={product.image[0]}
          alt={product.name}
        />
      </div>

      {/* Product Info */}
      <div className="flex-grow flex flex-col">
        <p className="text-zinc-400 text-sm capitalize">{product.category}</p>
        <h3 className="text-zinc-200 font-medium text-lg mt-1 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Price */}
        <div className="flex items-end justify-between mt-auto pt-4">
          <div>
            {product.offerPrice ? (
              <>
                <p className="text-xl font-bold text-amber-400">
                  {currency} {product.offerPrice}
                </p>
                <p className="text-zinc-500 text-sm line-through">
                  {currency} {product.price}
                </p>
              </>
            ) : (
              <p className="text-xl font-bold text-amber-400">
                {currency} {product.price}
              </p>
            )}
          </div>
          
          {/* Add to Cart */}
          <div onClick={(e) => e.stopPropagation()} className="text-amber-400">
            {!cartItems[id] ? (
              <button
                className="flex items-center justify-center gap-2 bg-zinc-700 hover:bg-zinc-600 border border-zinc-600 w-24 h-10 rounded-md text-amber-400 font-medium transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(id);
                }}
              >
                <FaShoppingCart size={14} />
                Add
              </button>
            ) : (
              <div className="flex items-center justify-between w-24 h-10 bg-zinc-700 rounded-md">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCart(id);
                  }}
                  className="h-full px-3 flex items-center text-amber-400 hover:text-amber-300"
                >
                  <FaMinus size={12} />
                </button>
                <span className="text-amber-400 font-medium">{cartItems[id]}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(id);
                  }}
                  className="h-full px-3 flex items-center text-amber-400 hover:text-amber-300"
                >
                  <FaPlus size={12} />
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