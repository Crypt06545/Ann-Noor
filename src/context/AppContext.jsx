import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(true);
  const [showUserLogin, setShowUserLogin] = useState(false);

  const value = {
    user,
    setUser,
    showUserLogin,
    setShowUserLogin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
