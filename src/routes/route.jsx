import MainLayout from "../layouts/MainLayout";
import DashLayout from "../layouts/DashLayout";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Errorpage from "../pages/Errorpage";
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
import { createBrowserRouter } from "react-router-dom";
import { AdminRoute, PrivateRoute, } from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Errorpage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about-products/:id", element: <ProductDetails /> },
      { path: "/cart", element: <Cart /> },
      {
        path: "/shipping-address",
        element: (
          <PrivateRoute>
            <ShippingAddress />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><AdminRoute><DashLayout /></AdminRoute></PrivateRoute>,
    errorElement: <Errorpage />,
    children: [
      { path: "/dashboard", element: <Statics /> },
      { path: "/dashboard/add-product", element: <DAddProduct /> },
      { path: "/dashboard/orders", element: <Orders /> },
      { path: "/dashboard/manage-products", element: <ManageProducts /> },
      { path: "/dashboard/users", element: <Users /> },
    ],
  },
  { path: "/login", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
]);

export default router;
