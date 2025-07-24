export default function CarpetasList({ carpetas, onVerCarpeta, onEliminarCarpeta }) {
  if (!carpetas || carpetas.length === 0) {
    return <div className="text-gray-500 mb-6">No tienes carpetas.</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
      {carpetas.map(carpeta => (
        <div key={carpeta._id} className="bg-white rounded shadow p-4 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-xl font-bold mb-2">
            <span role="img" aria-label="Carpeta">📁</span>
          </div>
          <div className="font-semibold mb-2">{carpeta.nombre}</div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => onVerCarpeta(carpeta._id)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded font-semibold transition"
            >
              Ver fotos
            </button>
            <button
              onClick={() => onEliminarCarpeta(carpeta._id)}
              className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded font-semibold transition"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 