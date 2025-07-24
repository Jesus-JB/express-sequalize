import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function renderStars(calificacion) {
  const n = Math.max(1, Math.min(5, Number(calificacion)));
  return (
    <div className="flex items-center justify-center mb-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${i < n ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
        </svg>
      ))}
    </div>
  );
}

export default function Gallery() {
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const fetchFotos = () => {
    api.get("/fotos")
      .then(res => setFotos(res.data))
      .catch(() => setFotos([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFotos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta foto?")) return;
    setLoading(true);
    try {
      await api.delete(`/fotos/${id}`);
      toast.success("Foto eliminada");
      fetchFotos();
    } catch {
      toast.error("Error al eliminar la foto");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="max-w-4xl mx-auto pt-24 px-4 flex justify-center items-center min-h-[40vh]">
      <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pt-24 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Galería de Fotos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {fotos.map(foto => (
          <div
            key={foto._id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center transition hover:shadow-xl cursor-pointer group"
            onClick={e => {
              // Evita que el click en los botones de editar/eliminar navegue
              if (e.target.tagName === 'BUTTON') return;
              navigate(`/photo/${foto._id}`);
            }}
          >
            <div className="w-full h-48 overflow-hidden rounded-lg mb-2">
              <img
                src={`${process.env.REACT_APP_API_URL || "http://localhost:3001"}/${foto.ruta}`}
                alt={foto.titulo}
                className="w-full h-full object-cover transform transition duration-300 group-hover:scale-105 group-hover:shadow-lg"
              />
            </div>
            <h2 className="font-bold mb-1 text-center text-lg">{foto.titulo}</h2>
            <p className="text-sm text-gray-600 text-center mb-1">{foto.descripcion}</p>
            {renderStars(foto.calificacion)}
            <div className="flex flex-wrap gap-1 justify-center mt-1 mb-2">
              {(foto.etiquetas || []).map(et => (
                <span key={et._id} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{et.nombre}</span>
              ))}
            </div>
            <button
              onClick={e => { e.stopPropagation(); navigate(`/photo/${foto._id}`); }}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded font-semibold transition"
            >
              Ver detalle
            </button>
            {isAuth && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={e => { e.stopPropagation(); navigate(`/photo/${foto._id}/edit`); }}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded font-semibold transition"
                >Editar</button>
                <button
                  onClick={e => { e.stopPropagation(); handleDelete(foto._id); }}
                  className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded font-semibold transition"
                >Eliminar</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 