import { Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import DetalleProducto from "../components/DetalleProducto";
import Contacto from "../pages/Contact";
import Admin from "../pages/Admin";
import AdminUsers from "../pages/AdminUsers";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<App />} />
      <Route path="/producto/:id" element={<DetalleProducto />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/login" element={<Login />} />

      {/* Rutas Protegidas (Solo Admin) */}
      <Route
        path="/admin-productos"
        element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-users" // Ruta sugerida para Administrar Usuarios
        element={
          <PrivateRoute>
            <AdminUsers />
          </PrivateRoute>
        }
      />

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;