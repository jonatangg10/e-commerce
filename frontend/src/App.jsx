import React, { useContext } from 'react';
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
import OfertasTemporales from './components/OfertasTemporales';

function App() {
  const {
    productosFiltrados,
    categorias,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    carritoVisible,
    setCarritoVisible,
    agregarAlCarrito,
    loading,
    error,
  } = useContext(CarritoContext);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-red-500 text-lg">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onAbrirCarrito={() => setCarritoVisible(true)} />
      <ImageCarousel />
      {/* <OfertasTemporales /> */}
      <div className="container mx-auto px-4 py-8">
        {/* Sección de Ofertas Temporales */}
        

        <div className="pt-10">
          <Toaster position="bottom-right" />
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Productos Destacados</h1>

          <Filtros 
            categorias={categorias}
            categoriaSeleccionada={categoriaSeleccionada}
            onCambiarCategoria={setCategoriaSeleccionada}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productosFiltrados.map(prod => (
              <Producto 
                key={prod.id} 
                producto={prod} 
                agregarAlCarrito={agregarAlCarrito}
              />
            ))}
          </div>
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