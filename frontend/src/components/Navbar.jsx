import {
  ShoppingCartIcon,
  UserCircleIcon,
  Bars3Icon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState, useLayoutEffect, useRef } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { Link } from "react-router-dom";

const userName = import.meta.env.VITE_USER_NAME || "Jonatan Gutierrez";

function Navbar() {
  const { carrito, setCarritoVisible } = useContext(CarritoContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  const dropdownRef = useRef(null);

  const primerNombre = userName.split(" ")[0];

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Contacto", path: "/contacto" },
  ];

  useLayoutEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
    console.log("Cerrando sesión...");
    setDropdownOpen(false);
  };

  const handleSettings = () => {
    console.log("Navegando a configuración...");
    setDropdownOpen(false);
  };

  return (
    <nav className={`bg-white fixed w-full top-0 z-50 shadow-md ${isMobile ? "p-3" : "p-4"}`}>
      <div className="container mx-auto flex justify-between items-center">
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

        {!isMobile && (
          <div className="flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
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

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCarritoVisible(true)}
            aria-label="Ver carrito"
            className="relative text-gray-800 hover:text-red-600 transition-colors"
          >
            <ShoppingCartIcon className={isMobile ? "h-5 w-5" : "h-6 w-6"} />
            {totalItems > 0 && (
              <span
                className={`absolute ${isMobile ? "-top-1 -right-1 h-4 w-4" : "-top-1 -right-1 h-5 w-5"
                  } bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center`}
              >
                {totalItems}
              </span>
            )}
          </button>

          <div className="relative flex items-center" ref={dropdownRef}>
            {/* <span className={`text-gray-800 ${isMobile ? "text-sm" : "text-sm font-medium"}`}>
              {isMobile ? primerNombre : userName}
            </span> */}

            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-gray-800 hover:text-red-600 transition-colors ml-2"
            >
              <UserCircleIcon className={isMobile ? "h-5 w-5" : "h-7 w-7"} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <Link
                  to="/admin"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <WrenchScrewdriverIcon className="h-4 w-4 mr-2" />
                  Administrar
                </Link>

                <Link
                  to="/login"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <WrenchScrewdriverIcon className="h-4 w-4 mr-2" />
                  Prueba
                </Link>

                <button
                  onClick={handleSettings}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Cog6ToothIcon className="h-4 w-4 mr-2" />
                  Configuración
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {menuOpen && isMobile && (
        <div className="bg-gray-100 mt-2 py-2 px-4 rounded">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block py-2 text-gray-800 hover:text-red-600 transition-colors"
              onClick={() => setMenuOpen(false)}
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