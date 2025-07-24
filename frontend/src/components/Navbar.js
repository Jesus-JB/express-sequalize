import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";

export default function Navbar() {
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();

  // Obtener el rol del usuario desde el token
  let rol = null;
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      rol = payload.rol;
    }
  } catch {}

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      if (refreshToken) {
        await api.post("/users/logout", { refreshToken });
      }
    } catch {}
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userEmail");
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 shadow-md z-50 text-white flex justify-between items-center px-6 py-3">
      <div className="flex items-center space-x-2 font-bold text-xl">
        {/* Logo simple: círculo con inicial */}
        <div className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-extrabold text-lg">G</div>
        <NavLink to="/" className="hover:underline">Galería</NavLink>
      </div>
      <div className="space-x-4 flex items-center">
        <NavLink to="/gallery" className={({ isActive }) => isActive ? "underline font-semibold" : "hover:underline"}>Galería</NavLink>
        <NavLink to="/info" className={({ isActive }) => isActive ? "underline font-semibold" : "hover:underline"}>Info</NavLink>
        <NavLink to="/changelog" className={({ isActive }) => isActive ? "underline font-semibold" : "hover:underline"}>Changelog</NavLink>
        {isAuth && (
          <>
            <NavLink to="/upload" className={({ isActive }) => isActive ? "underline font-semibold" : "hover:underline"}>Subir Foto</NavLink>
            <NavLink to="/tags" className={({ isActive }) => isActive ? "underline font-semibold" : "hover:underline"}>Etiquetas</NavLink>
            {rol === 'admin' && (
              <NavLink to="/users-management" className={({ isActive }) => isActive ? "underline font-semibold" : "hover:underline"}>Usuarios</NavLink>
            )}
            <NavLink to="/profile" className={({ isActive }) => isActive ? "underline font-semibold" : "hover:underline"}>Perfil</NavLink>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded ml-2 transition"
            >
              Logout
            </button>
          </>
        )}
        {!isAuth && (
          <>
            <NavLink to="/login" className={({ isActive }) => isActive ? "underline font-semibold" : "hover:underline"}>Login</NavLink>
            <NavLink to="/register" className={({ isActive }) => isActive ? "underline font-semibold" : "hover:underline"}>Registro</NavLink>
          </>
        )}
      </div>
    </nav>
  );
} 