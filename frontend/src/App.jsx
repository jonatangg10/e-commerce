import React, { useContext, useState, useEffect } from 'react';
import Producto from './components/Producto';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import Footer from './components/Footer';
import './App.css';
import { Toaster } from 'react-hot-toast';
import ImageCarousel from './components/ImageCarousel';
import { CarritoContext } from "./context/CarritoContext";
import Carrito from './components/Carrito';
import Filtros from './components/Filtros';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function App() {
  const {
    categorias,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    carritoVisible,
    setCarritoVisible,
    agregarAlCarrito,
    obtenerProductosPaginados, // Usaremos esta función
    error,
  } = useContext(CarritoContext);

  // --- ESTADOS PARA PAGINACIÓN ---
  const [productosPaginados, setProductosPaginados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalProductos, setTotalProductos] = useState(0);
  const [loadingLocal, setLoadingLocal] = useState(true);
  const PAGE_SIZE = 12;

  // Lógica para cargar productos cuando cambie la página o categoría
  useEffect(() => {
    const cargarDatos = async () => {
      setLoadingLocal(true);
      const filtro = categoriaSeleccionada === "todos" ? "" : categoriaSeleccionada;
      
      const res = await obtenerProductosPaginados({
        page: paginaActual,
        pageSize: PAGE_SIZE,
        categoria: filtro
      });

      setProductosPaginados(res.productos);
      setTotalProductos(res.total);
      setLoadingLocal(false);
    };

    cargarDatos();
  }, [paginaActual, categoriaSeleccionada, obtenerProductosPaginados]);

  // Resetear a página 1 si el usuario cambia de categoría
  useEffect(() => {
    setPaginaActual(1);
  }, [categoriaSeleccionada]);

  const totalPaginas = Math.ceil(totalProductos / PAGE_SIZE);

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-red-500 text-lg">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onAbrirCarrito={() => setCarritoVisible(true)} />
      <ImageCarousel />
      
      <div className="container mx-auto px-4 py-8">
        <div className="pt-10">
          <Toaster position="bottom-right" />
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Productos Destacados</h1>

          <Filtros 
            categorias={categorias}
            categoriaSeleccionada={categoriaSeleccionada}
            onCambiarCategoria={setCategoriaSeleccionada}
          />

          {loadingLocal ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {/* GRID DE PRODUCTOS (Máximo 20) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productosPaginados.map(prod => (
                  <Producto 
                    key={prod.id} 
                    producto={prod} 
                    agregarAlCarrito={agregarAlCarrito}
                  />
                ))}
              </div>

              {/* CONTROLES DE PAGINACIÓN */}
              {totalPaginas > 1 && (
                <div className="mt-12 flex justify-center items-center gap-3 pb-10">
                  <button
                    onClick={() => setPaginaActual(p => Math.max(1, p - 1))}
                    disabled={paginaActual === 1}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-blue-50 disabled:opacity-30 transition-all"
                  >
                    <ChevronLeftIcon className="h-5 w-5 text-blue-600" />
                  </button>

                  <span className="text-sm font-semibold text-gray-700">
                    Página {paginaActual} de {totalPaginas}
                  </span>

                  <button
                    onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))}
                    disabled={paginaActual === totalPaginas}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-blue-50 disabled:opacity-30 transition-all"
                  >
                    <ChevronRightIcon className="h-5 w-5 text-blue-600" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Modal isOpen={carritoVisible} onClose={() => setCarritoVisible(false)}>
        <Carrito />
      </Modal>

      <Footer />
    </div>
  );
}

export default App;