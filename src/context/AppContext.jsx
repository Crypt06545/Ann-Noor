import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";

export const AppContext = createContext();

const fetchUser = async () => {
  const { data } = await axiosInstance.get("/users/is-auth");
  if (data.success) return data.data;
  throw new Error("Not authenticated");
};

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;

  // Local state
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    refetchInterval:2000,
  });

  // Sync React Query data with local state
  useEffect(() => {
    setAuthLoading(isLoading);

    if (data) {
      setUser(data);
      setIsAdmin(data.role === "admin");
      setCartItems(data.cartItems || []);
    }

    if (isError) {
      setUser(null);
      setIsAdmin(false);
      setCartItems([]);
    }
  }, [data, isLoading, isError]);

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

export const useAppContext = () => useContext(AppContext);
