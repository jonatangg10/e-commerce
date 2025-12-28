import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * PrivateRoute robusto:
 * - Si existe AuthContext, usa isAuthenticated de ahí.
 * - Si no (por seguridad), usa localStorage como fallback.
 */
const PrivateRoute = ({ children }) => {
  const authCtx = useContext(AuthContext); // si no hay Provider, será undefined
  const isFromContext = authCtx && typeof authCtx.isAuthenticated !== "undefined";

  const isAuthenticated = isFromContext
    ? authCtx.isAuthenticated
    : localStorage.getItem("auth") === "true";

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;