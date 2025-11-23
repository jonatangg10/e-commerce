function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fondo semi-transparente */}
      <div
        className="fixed inset-0 bg-black/30"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Contenido modal */}
      <div
        className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold flex items-center gap-2">
            {title ? title : "🛒 Tu Carrito"}
          </h2>
          <button
            onClick={onClose}
            className="text-red-600 hover:text-red-800 text-2xl font-bold"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Cuerpo */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;