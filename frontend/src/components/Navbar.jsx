import {
  ShoppingCartIcon,
  UserCircleIcon,
  Bars3Icon,
  ArrowRightOnRectangleIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState, useLayoutEffect, useRef } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { carrito, setCarritoVisible } = useContext(CarritoContext);
  const { isAuthenticated, logout, usuario } = useAuth();

  console.log(
  "Datos del usuario:",
  usuario ? `${usuario.nombres} ${usuario.apellidos} (${usuario.correo})` : "Usuario no cargado"
);


  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const dropdownRef = useRef(null);
  const totalItems = carrito.reduce((t, i) => t + i.cantidad, 0);

  useLayoutEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    navigate("/");
    setTimeout(() => logout(), 50);
  };

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Contacto", path: "/contacto" },
  ];

  // Consola segura para usuario
  console.log("Estado de autenticación:", isAuthenticated);
  console.log(
    "Datos del usuario:",
    usuario ? `${usuario.nombres} ${usuario.apellidos} (${usuario.correo})` : "Usuario no cargado"
  );

  return (
    <nav className={`bg-white fixed w-full top-0 z-50 shadow-md ${isMobile ? "p-3" : "p-4"}`}>
      <div className="container mx-auto flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center space-x-4">
          {isMobile && (
            <button className="text-gray-800" onClick={() => setMenuOpen(!menuOpen)}>
              <Bars3Icon className="h-6 w-6" />
            </button>
          )}
          <Link to="/" className={`text-gray-900 font-bold ${isMobile ? "text-lg" : "text-xl"}`}>
            🛍️ InvenFact Pro
          </Link>
        </div>

        {/* Links Desktop */}
        {!isMobile && (
          <div className="flex space-x-6">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-800 hover:text-red-600 transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}

        {/* Right icons */}
        <div className="flex items-center space-x-4">

          {/* Carrito */}
          <button
            onClick={() => setCarritoVisible(true)}
            className="relative text-gray-800 hover:text-red-600"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Usuario */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-gray-800 hover:text-red-600 transition-colors ml-2"
            >
              <UserCircleIcon className={isMobile ? "h-5 w-5" : "h-7 w-7"} />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                {isAuthenticated && usuario ? (
                  <>
                    {/* Nombre y correo */}
                    <div className="px-4 py-2 text-gray-700 text-sm border-b">
                      👋 {usuario.nombres} {usuario.apellidos} <br />
                      {/* 📧 {usuario.correo} */}
                    </div>

                    {usuario.rol === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <WrenchScrewdriverIcon className="h-4 w-4 mr-2" />
                        Administrar
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <UserCircleIcon className="h-4 w-4 mr-2" />
                    Iniciar sesión
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && isMobile && (
        <div className="bg-gray-100 mt-2 py-2 px-4 rounded">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-gray-800 hover:text-red-600"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;