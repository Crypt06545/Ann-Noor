import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import useUserStore from "../stores/useUserStore";

const MainLayout = () => {
  const checkAuth = useUserStore((state) => state.checkAuth);
  // console.log(checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div>
      <Navbar />
      {/* dynamic pages  */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
