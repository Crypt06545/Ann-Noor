import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const MainLayout = () => {
  // console.log(checkAuth);

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
