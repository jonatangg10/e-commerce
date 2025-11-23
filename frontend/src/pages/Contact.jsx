import { useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CarritoContext } from "../context/CarritoContext";
import Modal from "../components/Modal";
import Carrito from "../components/Carrito";
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

const Contacto = () => {
  const { carritoVisible, setCarritoVisible } = useContext(CarritoContext);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar onAbrirCarrito={() => setCarritoVisible(true)} />

      <main className="flex-grow container mx-auto px-4 pt-28 pb-12">

        {/* Descripción */}
        <div className="max-w-6xl mx-auto">
          

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Información de contacto */}
            
            <div className="lg:w-1/2 bg-white p-8 rounded-lg shadow-md">
  {/* Título y descripción */}
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-gray-800 text-center mb-3">🛍️ InvenFact Pro</h2>
    <p className="text-gray-600 text-center">
      Completa el siguiente formulario y uno de nuestros asesores se pondrá en contacto contigo lo antes posible. Estaremos encantados de atenderte.
    </p>
  </div>

  {/* Información de contacto */}
  <div className="space-y-5">
    <div className="flex items-start">
      <MapPinIcon className="h-5 w-5 text-blue-600 mt-1 mr-3" />
      <div>
        <h3 className="font-medium text-gray-800">Dirección</h3>
        <p className="text-gray-600">Villeta Cundinamarca</p>
      </div>
    </div>

    <div className="flex items-start">
      <PhoneIcon className="h-5 w-5 text-blue-600 mt-1 mr-3" />
      <div>
        <h3 className="font-medium text-gray-800">Teléfono</h3>
        <p className="text-gray-600">+57 314 297 5647</p>
      </div>
    </div>

    <div className="flex items-start">
      <EnvelopeIcon className="h-5 w-5 text-blue-600 mt-1 mr-3" />
      <div>
        <h3 className="font-medium text-gray-800">Correo electrónico</h3>
        <p className="text-gray-600">mariaeugeniaieto@gmail.com</p>
      </div>
    </div>
  </div>
</div>

            {/* Formulario de contacto */}
            <div className="lg:w-1/2 bg-white p-8 rounded-lg shadow-md">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">NOMBRES</label>
                    <input
                      type="text"
                      placeholder="Nombres"
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                    <input
                      type="text"
                      placeholder="Apellidos"
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CORREO ELECTRONICO</label>
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">TU MENSAJE</label>
                  <textarea
                    rows="5"
                    placeholder="Ingresa tu mensaje"
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
                    He leído y acepto las politicas de privacidad 
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <Modal isOpen={carritoVisible} onClose={() => setCarritoVisible(false)}>
        <Carrito />
      </Modal>
    </div>
  );
};

export default Contacto;