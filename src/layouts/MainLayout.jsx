import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import WhatsAppFloatingButton from "../components/WhatsAppFloatingButton";

const MainLayout = () => {
  // console.log(checkAuth);

  return (
    <div>
      <Navbar />
      {/* dynamic pages  */}
      <Outlet />
      {/* <WhatsAppFloatingButton /> */}
      <Footer />
    </div>
  );
};

export default MainLayout;
