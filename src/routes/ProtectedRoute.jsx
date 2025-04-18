import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { LoadingSpinner } from "../components/LoadingSpinner";

// ProtectedRoute.jsx
// ProtectedRoute.jsx
export const PrivateRoute = ({ children }) => {
  const { user, authLoading } = useAppContext();

  if (authLoading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" replace />;
  
  return children;
};

// AdminRoute.jsx
export const AdminRoute = ({ children }) => {
  const { isAdmin } = useAppContext();

  if (!isAdmin) {
    // toast.error("Admin access required");
    return <Navigate to="/" replace />;
  }
  
  return children;
};