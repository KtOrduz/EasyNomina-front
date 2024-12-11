import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    // Si el usuario no está autenticado, redirige al login
    return <Navigate to="/" />;
  }

  // Si está autenticado, renderiza el contenido protegido
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Validamos que children sea un nodo React
};

export { ProtectedRoute };
