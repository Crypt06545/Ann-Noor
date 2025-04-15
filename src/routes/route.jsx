import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashLayout from "../layouts/DashLayout";

// Pages
import Home from "../pages/Home";
import Errorpage from "../pages/Errorpage";
import ProductPage from "../pages/ProductDetails";
import OrderInfo from "../pages/OrderInfo";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { useAppContext } from "../context/AppContext";

// Dashboard pages
import DAddProduct from "../pages/Dashboard/DAddProduct";
import Statics from "../pages/Dashboard/Statics";
import ManageProducts from "../pages/Dashboard/ManageProducts";
import Orders from "../pages/Dashboard/Orders";
import Users from "../pages/Dashboard/Users";
import Navbar from "../components/Navbar";

export default function AppRoutes() {
  const { user } = useAppContext();

  const isAdminPath = useLocation().pathname.includes('admin')

  return (
    <div>
      {isAdminPath ? null : <Navbar/>}
      <div>
        <Routes>
          <Route path="/" element={<Home/>}/>

        </Routes>
      </div>
    </div>
  );
}
