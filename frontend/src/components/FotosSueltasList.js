import LikeButton from "./LikeButton";
import ComentariosGaleria from "./ComentariosGaleria";

export default function FotosSueltasList({ fotos, onEliminarFoto }) {
  if (!fotos || fotos.length === 0) {
    return <div className="text-gray-500">No tienes fotos sueltas.</div>;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {fotos.map(foto => (
        <div key={foto._id} className="bg-white rounded shadow p-2 flex flex-col items-center">
          <img
            src={`${process.env.REACT_APP_API_URL || "http://localhost:3001"}/${foto.ruta}`}
            alt={foto.titulo}
            className="w-full h-32 object-cover rounded mb-2"
          />
          <div className="text-xs text-center font-semibold mb-1">{foto.titulo}</div>
          <LikeButton fotoId={foto._id} />
          <ComentariosGaleria fotoId={foto._id} />
          <button
            onClick={() => onEliminarFoto(foto._id)}
            className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded font-semibold text-xs transition mt-1"
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
} 