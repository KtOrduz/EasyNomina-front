import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ProtectedRoute };
