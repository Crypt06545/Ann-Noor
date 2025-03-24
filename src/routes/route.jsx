import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Errorpage from "../pages/Errorpage";
import Home from "../pages/Home";
import ProductPage from "../pages/ProductDetails";
import ProDemo from "../pages/ProDemo";

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
        // element: <ProductPage />,
        element: <ProDemo />,
      },
    ],
  },
]);

export default router;
