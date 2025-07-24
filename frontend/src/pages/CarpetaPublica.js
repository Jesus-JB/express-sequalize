import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import LikeButton from "../components/LikeButton";
import ComentariosGaleria from "../components/ComentariosGaleria";

export default function CarpetaPublica() {
  const { id } = useParams();
  const [carpeta, setCarpeta] = useState(null);
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/carpetas/${id}`)
      .then(res => {
        setCarpeta(res.data.carpeta);
        setFotos(res.data.fotos);
      })
      .catch(() => {
        setCarpeta(null);
        setFotos([]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="max-w-4xl mx-auto pt-24 px-4 flex justify-center items-center min-h-[40vh]">
      <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
    </div>
  );

  if (!carpeta) return (
    <div className="max-w-4xl mx-auto pt-24 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4 text-red-600">Carpeta no encontrada</h1>
      <button onClick={() => navigate(-1)} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition">Volver</button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pt-24 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Carpeta: {carpeta.nombre}</h1>
      {fotos.length === 0 ? (
        <div className="text-gray-500">No hay fotos en esta carpeta.</div>
      ) : (
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
            </div>
          ))}
        </div>
      )}
      <button onClick={() => navigate(-1)} className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition">Volver</button>
    </div>
  );
} 