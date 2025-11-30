import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext"; // Importar contexto

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ⬅️ Función para guardar usuario globalmente

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      // 👉 Guardar usuario en el AuthContext
      login(data.usuario);

      navigate("/admin");
    } catch (error) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white flex flex-col md:flex-row rounded-3xl shadow-xl overflow-hidden max-w-4xl w-full">

        {/* Formulario */}
        <div className="w-full md:w-1/2 p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
          <p className="text-gray-500 text-sm mb-6">
            Si ya tienes una cuenta, inicia sesión
          </p>

          {error && (
            <div className="text-red-500 text-sm mb-3 text-center">{error}</div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
                className="w-full p-3 mt-1 bg-gray-100 rounded-lg outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 mt-1 bg-gray-100 rounded-lg outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="text-right">
              <button type="button" className="text-sm text-blue-600 hover:underline">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
              Ingresar
            </button>
          </form>

          <div className="flex items-center gap-4 my-5">
            <span className="flex-1 h-px bg-gray-300"></span>
            <span className="text-xs text-gray-500">O</span>
            <span className="flex-1 h-px bg-gray-300"></span>
          </div>

          <button
            type="button"
            className="w-full border border-gray-300 rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
          >
            <FcGoogle className="text-xl" />
            Iniciar sesión con Google
          </button>

          <p className="text-sm text-gray-600 text-center mt-6">
            ¿No tienes una cuenta?
          </p>
          <button
            onClick={() => navigate("/register")}
            className="mt-2 border border-blue-600 text-blue-600 w-full py-2 rounded-lg hover:bg-blue-50 transition"
          >
            Registrarse
          </button>
        </div>

        <div className="hidden md:flex w-1/2">
          <img
            src="/images/aws.jpg"
            alt="Imagen de inicio de sesión"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;