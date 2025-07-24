import { FaCameraRetro } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-blue-50 text-blue-900 py-4 mt-12 border-t border-blue-100 flex flex-col items-center">
      <div className="flex items-center gap-2 mb-1">
        <FaCameraRetro className="text-blue-400 text-xl" />
        <span className="font-semibold">Galería de Fotos</span>
        <span className="ml-2 text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded">v0.1</span>
      </div>
      <div className="text-xs text-blue-700 mb-1">&copy; {new Date().getFullYear()} Proyecto académico. Desarrollado con React, Tailwind y Express.</div>
      <div className="text-xs text-blue-700 mb-1">Novedades: Conexión a la nube, login/register seguro, gestión de usuarios y fotos, roles, galería, etiquetas, soporte para imágenes en MongoDB Atlas, despliegue en Vercel/Render.</div>
    </footer>
  );
} 