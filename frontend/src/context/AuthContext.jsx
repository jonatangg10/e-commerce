import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mantener login aunque se recargue la página
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // ⬅️ Guardar usuario globalmente
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

// Hook para usar más fácil el contexto
export const useAuth = () => useContext(AuthContext);
