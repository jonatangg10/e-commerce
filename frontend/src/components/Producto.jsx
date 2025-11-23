import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";

const Producto = ({ producto, agregarAlCarrito }) => {
  // Estilo de stock
  const getStockStyle = () => {
    if (producto.stock <= 0) return 'text-red-500 font-semibold';
    if (producto.stock <= 5) return 'text-yellow-500';
    return 'text-green-500';
  };

  // Color de badge según etiqueta
  const badgeColor = producto.etiqueta === 'Nuevo' ? 'bg-yellow-500' : 'bg-pink-500';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative">
        {/* Badge si existe etiqueta */}
        {producto.etiqueta && (
          <div className={`absolute top-2 left-2 ${badgeColor} text-white text-xs font-bold px-2 py-1 rounded`}>
            {producto.etiqueta}
          </div>
        )}

        {/* Enlace a detalle */}
        <Link to={`/producto/${producto.id}`}>
          <img 
            src={producto.imagen} 
            alt={producto.nombre} 
            className="w-full h-60 object-cover"
          />
        </Link>

        {/* Mensaje de agotado */}
        {producto.stock <= 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">AGOTADO</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <Link to={`/producto/${producto.id}`}>
            <h3 className="font-bold text-lg hover:text-blue-600 transition-colors">{producto.nombre}</h3>
          </Link>
          <span className="text-gray-600 font-medium">${producto.precio.toFixed(2)}</span>
        </div>

        <div className="mt-2 flex justify-between items-center">
          <span className={`text-sm ${getStockStyle()}`}>
            {producto.stock > 0 
              ? `${producto.stock} Unidades disponibles` 
              : 'Sin stock'}
          </span>
        </div>

        <div className="mt-2">
          <button
            onClick={() => agregarAlCarrito(producto)}
            disabled={producto.stock <= 0}
            className={`w-full py-2 rounded-md flex items-center justify-center gap-1 transition-colors ${
              producto.stock > 0
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {producto.stock > 0 && <IoAdd />}
            {producto.stock > 0 ? 'Añadir al carrito' : 'No disponible'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Producto;