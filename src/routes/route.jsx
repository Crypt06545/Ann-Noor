import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashLayout from "../layouts/DashLayout";
import Errorpage from "../pages/Errorpage";
import Home from "../pages/Home";
import ProductPage from "../pages/ProductDetails";
import OrderInfo from "../pages/OrderInfo";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import AddProduct from "../pages/Dashboard/AddProduct";
import Statics from "../pages/Dashboard/Statics";
import ManageProducts from "../pages/Dashboard/ManageProducts";
import Orders from "../pages/Dashboard/Orders";
import Users from "../pages/Dashboard/Users";

// Route protection
import PublicRoute from "./PublicRoute";
// Optional: import PrivateRoute if you want to protect dashboard
// import PrivateRoute from "../components/PrivateRoute";

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
      },
      {
        path: "/order-info",
        element: <OrderInfo />,
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    // Optional: protect this using PrivateRoute if needed
    // element: (
    //   <PrivateRoute>
    //     <DashLayout />
    //   </PrivateRoute>
    // ),
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
