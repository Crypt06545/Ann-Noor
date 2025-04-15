// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore";

const PrivateRoute = ({ children }) => {
  const user = useUserStore((state) => state.user);
  const checkingAuth = useUserStore((state) => state.checkingAuth);

  if (checkingAuth) {
    return (
      <div className="min-h-screen w-11/12 mx-auto flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-amber-600"></div>
      </div>
    );
  }

  if (!user || user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
