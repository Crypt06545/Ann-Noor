import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from "react-router-dom";

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

// Dashboard pages
import DAddProduct from "../pages/Dashboard/DAddProduct";
import Statics from "../pages/Dashboard/Statics";
import ManageProducts from "../pages/Dashboard/ManageProducts";
import Orders from "../pages/Dashboard/Orders";
import Users from "../pages/Dashboard/Users";

import { useAppContext } from "../context/AppContext";
import Cart from "../pages/Cart";

export function AppRoutesWrapper() {
  const { showUserLogin,user } = useAppContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />} errorElement={<Errorpage />}>
        <Route path="/" element={<Home />} />
        <Route path="/about-products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/order-info/:orderId" element={<OrderInfo />} /> */}

        {/* Dashboard Routes */}
        <Route path="/admin" element={<DashLayout />}>
          <Route path="statistics" element={<Statics />} />
          <Route path="add-product" element={<DAddProduct />} />
          <Route path="manage-products" element={<ManageProducts />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
        </Route>

        <Route path="/login" element={user ? <Navigate to="/" /> : <SignIn />}/>
        <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />}/>


      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
