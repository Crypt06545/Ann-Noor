import MainLayout from "../layouts/MainLayout";
import DashLayout from "../layouts/DashLayout";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Errorpage from "../pages/Errorpage";
import ProductPage from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import ShippingAddress from "../pages/ShippingAddress";
import MyOrders from "../pages/MyOrders";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import DAddProduct from "../pages/Dashboard/DAddProduct";
import Statics from "../pages/Dashboard/Statics";
import ManageProducts from "../pages/Dashboard/ManageProducts";
import Orders from "../pages/Dashboard/Orders";
import Users from "../pages/Dashboard/Users";
// import { useAppContext } from "../context/AppContext";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Errorpage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about-products/:id", element: <ProductDetails /> },
      { path: "/cart", element: <Cart /> },
      { path: "/shipping-address", element: <ShippingAddress /> },
      { path: "/my-orders", element: <MyOrders /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashLayout />,
    errorElement: <Errorpage />,
    children: [
      // { path: "statics", element: <Statics /> },
      { path: "add-product", element: <DAddProduct /> },
      { path: "orders", element: <Orders /> },
      { path: "manage-products", element: <ManageProducts /> },
      { path: "users", element: <Users /> },
    ],
  },
  { path: "/login", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
]);

export default router;
