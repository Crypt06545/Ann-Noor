import { createBrowserRouter, createRoutesFromElements, Route, Navigate, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashLayout from "../layouts/DashLayout";
import Home from "../pages/Home";
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
import { useAppContext } from "../context/AppContext";

export function AppRoutesWrapper() {
  const { isAdmin, user } = useAppContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Main Routes */}
        <Route element={<MainLayout />} errorElement={<Errorpage />}>
          <Route path="/" element={<Home />} />
          <Route path="/about-products/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping-address" element={<ShippingAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />

          {/* Login & Signup Routes */}
          <Route path="/login" element={user ? <Navigate to="/" /> : <SignIn />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={isAdmin ? <DashLayout /> : <Navigate to="/" />}>
          <Route path="statistics" element={<Statics />} />
          <Route path="add-product" element={<DAddProduct />} />
          <Route path="manage-products" element={<ManageProducts />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}
