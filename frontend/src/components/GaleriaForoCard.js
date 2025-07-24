import LikeButton from "./LikeButton";
import ComentariosGaleria from "./ComentariosGaleria";

export default function GaleriaForoCard({ usuario, onVerGaleria }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-col items-start">
      <div className="flex items-center gap-4 mb-2 w-full">
        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
          {usuario.email[0].toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-lg">{usuario.email}</div>
        </div>
        <button
          onClick={() => onVerGaleria(usuario._id)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition"
        >
          Ver galería
        </button>
      </div>
      <div className="flex items-center gap-4 mb-2">
        <LikeButton galeriaUsuarioId={usuario._id} />
      </div>
      <ComentariosGaleria galeriaUsuarioId={usuario._id} />
    </div>
  );
} 