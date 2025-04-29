import { createContext, useContext, useState } from "react";
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

  const [isAdmin, setIsAdmin] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: user, isLoading: authLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser
    });

  const cartItems = user?.cartItems || [];

  // Update isAdmin dynamically
  useState(() => {
    if (user?.role) {
      setIsAdmin(user.role === "admin");
    }
  }, [user]);

  const value = {
    user,
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
