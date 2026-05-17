import { useContext, useMemo, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CarritoContext } from "../context/CarritoContext";
import Modal from "../components/Modal";
import Carrito from "../components/Carrito";
import { PencilIcon, TrashIcon, PlusIcon, CubeIcon } from "@heroicons/react/24/outline";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const Admin = () => {
  const {
    obtenerProductosPaginados,
    carritoVisible,
    setCarritoVisible,
    loading,
    error,
    categorias
  } = useContext(CarritoContext);

  const [globalFilter, setGlobalFilter] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("");
  const [productoEditando, setProductoEditando] = useState(null);
  const [productosPaginados, setProductosPaginados] = useState([]);
  const [totalProductos, setTotalProductos] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const cargarProductos = async () => {
    try {
      const { productos: productosData, total } = await obtenerProductosPaginados({
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        search: globalFilter,
        categoria: categoriaFilter,
      });
      setProductosPaginados(productosData);
      setTotalProductos(total);
    } catch (err) {
      console.error("Error al cargar productos:", err);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, [pagination, globalFilter, categoriaFilter]);

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      {
        accessorKey: "nombre",
        header: "Producto",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <img 
              src={row.original.imagen || "/images/placeholder.jpg"} 
              alt={row.original.nombre}
              className="h-10 w-10 object-cover rounded border border-gray-200"
            />
            <span className="font-medium text-gray-800">{row.original.nombre}</span>
          </div>
        )
      },
      {
        accessorKey: "precio",
        header: "Precio",
        cell: (info) => <span className="text-gray-700 font-semibold">${info.getValue()}</span>,
      },
      { 
        accessorKey: "stock", 
        header: "Stock",
        cell: (info) => (
          <span className={`px-2 py-1 rounded text-xs font-bold ${info.getValue() < 5 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {info.getValue()} unid.
          </span>
        )
      },
      { accessorKey: "categoria", header: "Categoría" },
      {
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => (
          <div className="flex space-x-3">
            <button
              onClick={() => setProductoEditando(row.original)}
              className="text-blue-600 hover:text-blue-800"
              title="Editar"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              className="text-red-600 hover:text-red-800"
              title="Eliminar"
            >
              <TrashIcon className="h-5 w-5" />
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
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(totalProductos / pagination.pageSize),
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar onAbrirCarrito={() => setCarritoVisible(true)} />

      <main className="flex-grow container mx-auto px-4 pt-28 pb-12">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-t-4 border-blue-600">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <CubeIcon className="h-7 w-7 text-blue-600" />
                Gestión de Productos
              </h2>
              <p className="text-gray-500 text-sm">Administra el inventario y catálogo de la tienda</p>
            </div>

            <button
              onClick={() => setProductoEditando({})}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
              Nuevo Producto
            </button>
          </div>

          {/* Filtros */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Buscar producto..."
              value={globalFilter}
              onChange={(e) => {
                setGlobalFilter(e.target.value);
                setPagination(prev => ({ ...prev, pageIndex: 0 }));
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-80 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <select
              value={categoriaFilter}
              onChange={(e) => {
                setCategoriaFilter(e.target.value);
                setPagination(prev => ({ ...prev, pageIndex: 0 }));
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Todas las categorías</option>
              {categorias?.filter(cat => cat !== "todos").map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 text-sm text-gray-700">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="flex items-center justify-between mt-6 border-t pt-4">
            <div className="text-sm text-gray-600">
              Mostrando {productosPaginados.length} de {totalProductos} productos
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-4 py-2 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 disabled:opacity-50 transition-all"
              >
                Anterior
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-4 py-2 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 disabled:opacity-50 transition-all"
              >
                Siguiente
              </button>
            </div>
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

export default Admin;