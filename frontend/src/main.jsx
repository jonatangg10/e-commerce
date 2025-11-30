import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./index.css";
import { CarritoProvider } from "./context/CarritoContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CarritoProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CarritoProvider>
    </AuthProvider>
  </React.StrictMode>
);