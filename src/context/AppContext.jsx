import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { dummyProducts } from "../assets/assets";
import axiosInstance from "../lib/axios";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [authLoading, setAuthLoading] = useState(true);

  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  // get user
  const fetchUser = async () => {
    try {
      setAuthLoading(true);
      const { data } = await axiosInstance.get("/users/is-auth");
      if (data.success) {
        setUser(data?.data);
        setIsAdmin(data.data?.role === "admin");
        if (data.data?.cartItems) {
          setCartItems(data.data.cartItems);
        }
        console.log(data);
        
      } else {
        setUser(false);
        setIsAdmin(false);
      }
    } catch (error) {
      setUser(false);
      setIsAdmin(false);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchProducts();
  }, []);
  // add product to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to cart");
  };
  // update quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };
  //romove product cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    toast.success("Removed from cart");
    setCartItems(cartData);
  };

  // total item count
  const cartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  // total cart amount
  const cartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo && cartItems[itemId] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[itemId];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  const value = {
    user,
    setUser,
    isAdmin,
    setIsAdmin,
    showUserLogin,
    setShowUserLogin,
    products,
    setProducts,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    cartCount,
    cartAmount,
    loading,
    setLoading,
    authLoading,
    setAuthLoading,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
