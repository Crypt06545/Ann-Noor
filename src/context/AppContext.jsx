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
        // console.log(data);
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
  }, []);

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

    cartItems,

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
