import { FaHistory, FaCheckCircle } from "react-icons/fa";

const changelog = [
  {
    version: "v0.2.0",
    date: "24-07-2025",
    changes: [
      "Ahora cada usuario tiene su propia galería privada de fotos y carpetas.",
      "Puedes crear carpetas para organizar tus fotos o subir fotos sueltas.",
      "La página principal muestra la lista de usuarios y puedes explorar la galería pública de cualquier usuario.",
      "Mejoras visuales y de navegación en la experiencia de usuario.",
      "Solo puedes acceder a tu galería personal si has iniciado sesión."
    ]
  },
  {
    version: "v0.1.1",
    date: "23-07-2025",
    changes: [
      "Permisos de edición/borrado de fotos solo para dueño o admin.",
      "Mejoras en Info y FAQ.",
      "Navbar con sección Changelog."
    ]
  },
  {
    version: "v0.1",
    date: "22-07-2025",
    changes: [
      "Primera versión pública.",
      "Conexión a la nube, login/register seguro, gestión de usuarios y fotos, roles, galería, etiquetas, soporte para imágenes en MongoDB Atlas, despliegue en Vercel/Render."
    ]
  }
];

export default function Changelog() {
  return (
    <div className="max-w-2xl mx-auto pt-24 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-800 flex items-center gap-2 border-b pb-2"><FaHistory /> Changelog</h1>
        <div className="relative ml-4">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-100 rounded-full" style={{left: -16}}></div>
          {changelog.map((entry, idx) => (
            <div key={entry.version} className="mb-8 flex items-start relative">
              <div className="flex flex-col items-center mr-4" style={{width: 32}}>
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold border-4 border-white shadow"><FaCheckCircle /></div>
                {idx < changelog.length - 1 && <div className="flex-1 w-1 bg-blue-200 mt-1 mb-1" style={{minHeight: 32}}></div>}
              </div>
              <div className="flex-1">
                <div className="text-blue-800 font-bold text-lg">{entry.version} <span className="text-xs text-gray-500">({entry.date})</span></div>
                <ul className="list-disc pl-6 text-blue-900 mt-1">
                  {entry.changes.map((c, i) => <li key={i} className="mb-1">{c}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-500 mt-6 text-right">¿Tienes sugerencias? ¡Contáctanos!</div>
      </div>
    </div>
  );
} 