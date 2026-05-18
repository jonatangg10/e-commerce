import React, { useState } from 'react';
import { 
  FiUsers, 
  FiSettings, 
  FiShoppingBag, 
  FiBell, 
  FiSearch, 
  FiMenu, 
  FiX, 
  FiLogOut,
  FiArrowUpRight,
  FiArrowDownRight,
  FiBox
} from 'react-icons/fi';
import { MdOutlineBarChart } from 'react-icons/md';
import { FaDollarSign } from 'react-icons/fa';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const recentUsers = [
    { id: 1, name: 'Ana Martínez', email: 'ana@example.com', role: 'Admin', status: 'Activo', date: '18 May, 2026' },
    { id: 2, name: 'Carlos Gomez', email: 'carlos@example.com', role: 'Editor', status: 'Inactivo', date: '15 May, 2026' },
    { id: 3, name: 'Sofía Rodríguez', email: 'sofia@example.com', role: 'Usuario', status: 'Activo', date: '12 May, 2026' },
    { id: 4, name: 'Alejandro Toro', email: 'alejo@example.com', role: 'Usuario', status: 'Pendiente', date: '10 May, 2026' },
  ];

  return (
    // Fondo general de la aplicación: Blanco Hueso Suave
    <div className="min-h-screen bg-slate-50 text-slate-800 flex font-sans antialiased">
      
      {/* --- SIDEBAR (Blanco Hueso / Slate Claro) --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-100 border-r border-slate-200 p-6 flex flex-col justify-between
        transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
              <span>🛍️ InvenFact Pro</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-500 hover:text-slate-900 transition-colors">
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Navegación del Menú */}
          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: MdOutlineBarChart },
              { id: 'usuarios', label: 'Usuarios', icon: FiUsers },
              { id: 'productos', label: 'Productos', icon: FiBox },
              { id: 'ventas', label: 'Ventas', icon: FiShoppingBag },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all
                  ${activeTab === item.id 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10' 
                    : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'}`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Perfil Inferior */}
        <div className="space-y-4">
          <div className="bg-slate-200/60 p-4 rounded-2xl border border-slate-300/50">
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <img 
                  className="w-10 h-10 rounded-full object-cover border border-blue-500/20" 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
                  alt="Avatar" 
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-100 rounded-full"></div>
              </div>
              <div className="overflow-hidden">
                <h4 className="text-sm font-bold truncate text-slate-900">Jonatan G.</h4>
                <p className="text-[10px] text-slate-500 truncate uppercase tracking-wider font-semibold">DevOps Admin</p>
              </div>
            </div>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-rose-600 transition-colors text-sm font-semibold">
            <FiLogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header Superior (Blanco Hueso con Desenfoque) */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-slate-200 sticky top-0 bg-slate-50/80 backdrop-blur-xl z-40">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-slate-600 hover:text-slate-900 transition-colors">
              <FiMenu className="w-6 h-6" />
            </button>
            <div className="relative w-full max-w-md group hidden sm:block">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar reportes, usuarios..." 
                className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all text-slate-900 placeholder-slate-400 shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2.5 text-slate-500 hover:text-slate-900 transition-all bg-white rounded-lg border border-slate-200 shadow-sm flex items-center justify-center">
              <FiBell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-500 font-medium">Lunes</span>
              <span className="text-sm font-bold text-slate-900">18 Mayo, 2026</span>
            </div>
          </div>
        </header>

        {/* Vista Principal */}
        <main className="p-8 space-y-8 overflow-y-auto">
          
          {/* Título de Sección */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight capitalize">{activeTab}</h1>
              <p className="text-slate-500 mt-1 font-medium">Monitoriza el rendimiento del sistema en tiempo real.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 rounded-xl text-sm font-bold transition-all border border-slate-200 shadow-sm">
                Filtros
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                Generar Reporte
              </button>
            </div>
          </div>

          {/* Tarjetas de Métricas (Contenedores en Blanco Puro) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              { id: 'sales', label: 'Ventas Totales', val: '$45.2k', change: '+12.5%', up: true, icon: FaDollarSign },
              { id: 'users', label: 'Nuevos Usuarios', val: '2,350', change: '+18.2%', up: true, icon: FiUsers },
              { id: 'orders', label: 'Órdenes Activas', val: '12,234', change: '-4.1%', up: false, icon: FiShoppingBag },
              { id: 'conv', label: 'Conversión', val: '4.23%', change: '+2.4%', up: true, icon: MdOutlineBarChart },
            ].map((stat) => (
              <div key={stat.id} className="bg-white border border-slate-200/80 p-6 rounded-3xl hover:border-slate-300 transition-colors group shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-2xl bg-slate-50 text-blue-600 group-hover:scale-110 transition-transform border border-slate-100 flex items-center justify-center shadow-inner">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className={`flex items-center gap-1 text-xs font-extrabold ${stat.up ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'} px-2 py-1 rounded-lg`}>
                    {stat.up ? <FiArrowUpRight className="w-3 h-3" /> : <FiArrowDownRight className="w-3 h-3" />}
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.val}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Gráfico de Barras en Blanco Puro */}
            <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-3xl p-6 flex flex-col shadow-sm">
              <h3 className="font-bold text-slate-900 text-lg mb-6">Actividad Semanal</h3>
              <div className="flex-1 flex items-end justify-between gap-3 h-64">
                {[45, 60, 100, 75, 90, 55, 70].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3">
                    <div 
                      className={`w-full rounded-t-xl transition-all duration-500 hover:brightness-95
                        ${i === 2 ? 'bg-blue-600 shadow-[0_4px_12px_rgba(37,99,235,0.2)]' : 'bg-slate-200'}`} 
                      style={{ height: `${h}%` }}
                    ></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Día {i+1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabla de Registros en Blanco Puro */}
            <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl overflow-hidden flex flex-col shadow-sm">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-lg">Últimos Registros</h3>
                <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Ver Detalles</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 bg-slate-50/50">
                      <th className="px-6 py-4">Usuario</th>
                      <th className="px-6 py-4">Rol</th>
                      <th className="px-6 py-4">Estado</th>
                      <th className="px-6 py-4 text-right">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{user.name}</span>
                            <span className="text-xs text-slate-400 font-medium">{user.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-semibold text-slate-600">{user.role}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider
                            ${user.status === 'Activo' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 
                              user.status === 'Pendiente' ? 'bg-amber-50 text-amber-600 border border-amber-200' : 
                              'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-xs text-slate-400 font-bold">{user.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;