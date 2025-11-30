import { Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import DetalleProducto from "../components/DetalleProducto";
import Contacto from "../pages/Contact";
import Admin from "../pages/Admin";
import Login from "../pages/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/producto/:id" element={<DetalleProducto />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
