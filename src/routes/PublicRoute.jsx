// components/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore";

const PublicRoute = ({ children }) => {
  const user = useUserStore((state) => state.user);
  const checkingAuth = useUserStore((state) => state.checkingAuth);

  if (checkingAuth) {
    return <div>Loading...</div>; // or a spinner
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
