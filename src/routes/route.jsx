import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Errorpage from "../pages/Errorpage";
import Home from "../pages/Home";
import ProductPage from "../pages/ProductDetails";
import ProDemo from "../pages/ProDemo";
import DashLayout from "../layouts/DashLayout";
import AddProduct from "../pages/Dashboard/AddProduct";
import Statics from "../pages/Dashboard/Statics";
import ManageProducts from "../pages/Dashboard/ManageProducts";
import Orders from "../pages/Dashboard/Orders";
import Users from "../pages/Dashboard/Users";
import OrderInfo from "../pages/OrderInfo";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Errorpage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <ProductPage />,
        // element: <ProDemo />,
      },
      {
        path: "/order-info",
        element: <OrderInfo />,
        // element: <ProDemo />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashLayout />,
    children: [
      {
        path: "manage-products",
        element: <ManageProducts />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "statistics",
        element: <Statics />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
]);

export default router;
