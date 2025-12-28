import { useContext, useMemo, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CarritoContext } from "../context/CarritoContext";
import Modal from "../components/Modal";
import Carrito from "../components/Carrito";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

const AdminUsers = () => {
  const {
    obtenerProductosPaginados,
    carritoVisible,
    setCarritoVisible,
    loading,
    error,
    estados,
    inactivarProducto,
    categorias
  } = useContext(CarritoContext);

  const [globalFilter, setGlobalFilter] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("");
  const [productoEditando, setProductoEditando] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [productosPaginados, setProductosPaginados] = useState([]);
  const [totalProductos, setTotalProductos] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Función para cargar productos paginados
  const cargarProductos = async () => {
    try {
      const { productos: productosData, total } = await obtenerProductosPaginados({
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        search: globalFilter,
        categoria: categoriaFilter,
      });

      console.log("Datos de paginación:", {
        página: pagination.pageIndex + 1,
        porPágina: pagination.pageSize,
        totalProductos: total,
        productosRecibidos: productosData.length,
        filtros: { search: globalFilter, categoria: categoriaFilter }
      });

      setProductosPaginados(productosData);
      setTotalProductos(total);
    } catch (err) {
      console.error("Error al cargar productos:", err);
    }
  };

  // Efecto para cargar productos cuando cambian los filtros o paginación
  useEffect(() => {
    cargarProductos();
  }, [pagination, globalFilter, categoriaFilter]);

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "nombre", header: "Nombre" },
      {
        accessorKey: "precio",
        header: "Precio",
        cell: (info) => `$${info.getValue()}`,
      },
      { accessorKey: "stock", header: "Stock" },
      {
        accessorKey: "etiqueta",
        header: "Etiqueta",
        cell: (info) => {
          const etiqueta = info.getValue();
          return etiqueta && etiqueta.trim() !== "" ? etiqueta : "Sin etiqueta";
        }
      },
      { accessorKey: "categoria", header: "Categoría" },
      {
        accessorKey: "imagen",
        header: "Imagen",
        cell: (info) => {
          const imagenPath = info.getValue();

          // Si no hay imagen
          if (!imagenPath) {
            return <span className="text-gray-400">Sin imagen</span>;
          }

          // Extrae el nombre del archivo (ej: "CSS.jpeg" de "/images/CSS.jpeg")
          const nombreArchivo = imagenPath.split('/').pop();

          // Construye la ruta correcta desde /public/images
          return (
            <div className="flex items-center gap-2">
              <img 
                src={`/images/${nombreArchivo}`} 
                alt="Imagen del producto" 
                className="h-15 w-15 object-cover rounded border border-gray-200"
                onError={(e) => {
                  e.target.onerror = null; // Previene loops de error
                  e.target.src = "/images/aws.jpg"; // Imagen de respaldo
                }}
              />
            </div>
          );
        },
      },
      {
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => setProductoEditando(row.original)}
              className="text-blue-600 hover:underline"
              title="Editar"
            >
              <PencilIcon className="h-5 w-5 cursor-pointer" />
            </button>
            <button
              onClick={() => setProductoAEliminar(row.original)}
              className="text-red-600 hover:underline"
              title="Eliminar"
            >
              <TrashIcon className="h-5 w-5 cursor-pointer" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: productosPaginados,
    columns,
    state: { 
      globalFilter,
      pagination
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(totalProductos / pagination.pageSize),
  });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar onAbrirCarrito={() => setCarritoVisible(true)} />

      <main className="flex-grow container mx-auto px-4 pt-28 pb-12">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            📦 Administración de Productos
          </h2>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <input
                type="text"
                placeholder="Buscar producto..."
                value={globalFilter}
                onChange={(e) => {
                  setGlobalFilter(e.target.value);
                  setPagination(prev => ({ ...prev, pageIndex: 0 }));
                }}
                className="px-3 py-2 border border-gray-300 rounded w-full md:w-64 focus:ring focus:ring-blue-200"
              />
              <select
                value={categoriaFilter}
                onChange={(e) => {
                  setCategoriaFilter(e.target.value);
                  setPagination(prev => ({ ...prev, pageIndex: 0 }));
                }}
                className="px-3 py-2 border border-gray-300 rounded w-full md:w-64 focus:ring focus:ring-blue-200"
              >
                <option value="">Todas las categorías</option>
                {categorias?.filter(cat => cat !== "todos").map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setProductoEditando({})}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full md:w-auto"
            >
              <PlusIcon className="h-5 w-5" />
              Agregar producto
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() === "asc"
                          ? " 🔼"
                          : header.column.getIsSorted() === "desc"
                          ? " 🔽"
                          : ""}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 text-sm text-gray-700"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="text-sm text-gray-700">
              Página {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      </main>

      <Footer />

      <Modal
        isOpen={carritoVisible}
        onClose={() => setCarritoVisible(false)}
        title="🛒 Tu Carrito"
      >
        <Carrito />
      </Modal>
    </div>
  );
};

export default AdminUsers;