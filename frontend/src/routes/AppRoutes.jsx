import { Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import DetalleProducto from "../components/DetalleProducto";
import Contacto from "../pages/Contact";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute"; // <-- mismo folder

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/producto/:id" element={<DetalleProducto />} />
      <Route path="/contacto" element={<Contacto />} />

      {/* Ruta protegida solo para /admin */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;