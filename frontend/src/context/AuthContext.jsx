import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");

    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUsuario(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error al parsear usuario:", error);
        localStorage.removeItem("usuario");
      }
    } else {
      localStorage.removeItem("usuario");
    }
  }, []);

  const login = (userData) => {
    setUsuario(userData);
    setIsAuthenticated(true);
    localStorage.setItem("usuario", JSON.stringify(userData));
  };

  const logout = () => {
    setUsuario(null);
    setIsAuthenticated(false);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);