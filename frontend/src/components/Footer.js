import { FaCameraRetro } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-blue-50 text-blue-900 py-4 mt-12 border-t border-blue-100 flex flex-col items-center">
      <div className="flex items-center gap-2 mb-1">
        <FaCameraRetro className="text-blue-400 text-xl" />
        <span className="font-semibold">Galería de Fotos</span>
      </div>
      <div className="text-xs text-blue-700">&copy; {new Date().getFullYear()} Proyecto académico. Desarrollado con React, Tailwind y Express.</div>
    </footer>
  );
} 