import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { FaStar, FaRegStar, FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";

const Card = ({ id, title, price, image }) => {
  const [count, setCount] = useState(0);
  const { currency,cartItems,addToCart,removeFromCart } = useAppContext();
  const product = {
    name: title,
    category: "Sports",
    price: price,
    offerPrice: (price * 0.8).toFixed(2),
    rating: 4,
    image: image,
  };
console.log(product);

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white w-full h-full flex flex-col hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="group cursor-pointer flex items-center justify-center h-48 md:h-56 lg:h-64 mb-4">
        <img
          className="group-hover:scale-105 transition-transform duration-300 h-full object-contain"
          // src={product.image}
          // alt={product.name}
          src="https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"
          alt="da"
        />
      </div>

      {/* Product Info */}
      <div className="flex-grow flex flex-col">
        <p className="text-gray-500 text-sm">{product.category}</p>
        <h3 className="text-gray-800 font-medium text-lg mt-1 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mt-2 text-amber-500">
          {[...Array(5)].map((_, i) => (
            i < product.rating ? 
              <FaStar key={i} size={14} /> : 
              <FaRegStar key={i} size={14} />
          ))}
          <span className="text-gray-500 text-sm ml-1">({product.rating})</span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-end justify-between mt-auto pt-4">
          <div>
            <p className="text-xl font-bold text-indigo-600">
              {product.offerPrice}
              <span className="text-sm font-normal ml-1">{currency}</span>
            </p>
            <p className="text-gray-400 text-sm line-through">
              {product.price}{currency}
            </p>
          </div>
          
          <div onClick={(e)=>{e.stopPropagation()}} className="text-indigo-600">
            {!cartItems[id] ? (
              <button
                className="flex cursor-pointer items-center justify-center gap-2 bg-indigo-100 hover:bg-indigo-200 border border-indigo-200 w-24 h-10 rounded-md text-indigo-700 font-medium transition-colors"
                onClick={() => addToCart(id)}
              >
                <FaShoppingCart size={14} />
                Add
              </button>
            ) : (
              <div className="flex items-center justify-between w-24 h-10 bg-indigo-100 rounded-md">
                <button
                  onClick={() => removeFromCart(id)}
                  className="h-full px-3 flex items-center text-indigo-700 hover:text-indigo-900"
                >
                  <FaMinus size={12} />
                </button>
                <span className="text-indigo-700 font-medium">{cartItems[id]}</span>
                <button
                  onClick={() => addToCart(id)}
                  className="h-full px-3 flex items-center text-indigo-700 hover:text-indigo-900"
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