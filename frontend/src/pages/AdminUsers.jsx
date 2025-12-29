import { useContext, useMemo, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UserContext } from "../context/UserContext"; // Cambiado a UserContext
import { CarritoContext } from "../context/CarritoContext"; // Solo para el carrito modal
import Modal from "../components/Modal";
import Carrito from "../components/Carrito";
import { PencilIcon, TrashIcon, PlusIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

const AdminUsers = () => {
  // Consumimos el contexto de usuarios
  const { obtenerUsuariosPaginados, eliminarUsuario, loadingUsers } = useContext(UserContext);
  const { carritoVisible, setCarritoVisible } = useContext(CarritoContext);

  const [globalFilter, setGlobalFilter] = useState("");
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [usuariosPaginados, setUsuariosPaginados] = useState([]);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const cargarUsuarios = async () => {
    const { usuarios, total } = await obtenerUsuariosPaginados({
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      search: globalFilter,
    });
    setUsuariosPaginados(usuarios);
    setTotalUsuarios(total);
  };

  useEffect(() => {
    cargarUsuarios();
  }, [pagination, globalFilter]);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      const exito = await eliminarUsuario(id);
      if (exito) cargarUsuarios(); // Recargar la lista
    }
  };

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { 
        accessorKey: "nombres", 
        header: "Nombre Completo",
        cell: ({ row }) => `${row.original.nombres} ${row.original.apellidos}`
      },
      { accessorKey: "correo", header: "Email" },
      { 
        accessorKey: "rol", 
        header: "Rol",
        cell: ({ getValue }) => (
          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
            getValue() === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
          }`}>
            {getValue().toUpperCase()}
          </span>
        )
      },
      { 
        accessorKey: "fecha_creacion", 
        header: "Registro",
        cell: ({ getValue }) => new Date(getValue()).toLocaleDateString() 
      },
      {
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => (
          <div className="flex space-x-3">
            <button
              onClick={() => setUsuarioEditando(row.original)}
              className="text-blue-600 hover:text-blue-800"
              title="Editar Rol"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleEliminar(row.original.id)}
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
    data: usuariosPaginados,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(totalUsuarios / pagination.pageSize),
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar onAbrirCarrito={() => setCarritoVisible(true)} />

      <main className="flex-grow container mx-auto px-4 pt-28 pb-12">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-t-4 border-blue-600">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <UserIcon className="h-7 w-7 text-blue-600" />
                Gestión de Usuarios
              </h2>
              <p className="text-gray-500 text-sm">Administra los accesos y roles de la plataforma</p>
            </div>

            <button
              onClick={() => setUsuarioEditando({})}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
              Nuevo Usuario
            </button>
          </div>

          {/* Buscador */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Buscar por nombre o correo..."
              value={globalFilter}
              onChange={(e) => {
                setGlobalFilter(e.target.value);
                setPagination(prev => ({ ...prev, pageIndex: 0 }));
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-96 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="overflow-x-auto">
            {loadingUsers ? (
              <div className="py-10 text-center text-gray-500 italic">Cargando usuarios...</div>
            ) : (
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
            )}
          </div>

          {/* Paginación */}
          <div className="flex items-center justify-between mt-6 border-t pt-4">
            <div className="text-sm text-gray-600">
              Mostrando {usuariosPaginados.length} de {totalUsuarios} usuarios
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

export default AdminUsers;