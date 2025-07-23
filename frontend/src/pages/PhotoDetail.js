import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { FaArrowLeft, FaTag } from "react-icons/fa";

function renderStars(calificacion) {
  const n = Math.max(1, Math.min(5, Number(calificacion)));
  return (
    <div className="flex items-center justify-center mb-2">
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

export default function PhotoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foto, setFoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api.get(`/fotos/${id}`)
      .then(res => {
        setFoto(res.data);
        setNotFound(false);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="max-w-xl mx-auto pt-24 px-4 flex justify-center items-center min-h-[40vh]">
      <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
    </div>
  );

  if (notFound) return (
    <div className="max-w-xl mx-auto pt-24 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4 text-red-600">Foto no encontrada</h1>
      <button onClick={() => navigate(-1)} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition flex items-center gap-2"><FaArrowLeft /> Volver</button>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto pt-24 px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center animate-fade-in">
        <div className="w-full flex justify-center mb-4">
          <div className="bg-gray-100 rounded-xl p-2 sm:p-4 md:p-6 w-full max-w-md h-72 flex items-center justify-center overflow-hidden group relative">
            <img
              src={`http://localhost:3001/${foto.ruta}`}
              alt={foto.titulo}
              className="max-h-64 w-auto max-w-full object-contain transform transition duration-300 group-hover:scale-105 group-hover:shadow-lg"
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center text-blue-800">{foto.titulo}</h2>
        {renderStars(foto.calificacion)}
        <p className="text-gray-700 text-center mb-2 border-b border-blue-100 pb-2 w-full">{foto.descripcion}</p>
        <div className="flex flex-wrap gap-2 justify-center mt-2 mb-2">
          {(foto.etiquetas || []).map(et => (
            <span key={et._id} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium"><FaTag className="text-blue-400" />{et.nombre}</span>
          ))}
        </div>
        <button onClick={() => navigate(-1)} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition flex items-center gap-2"><FaArrowLeft /> Volver</button>
      </div>
      <style>{`.animate-fade-in{animation:fadeIn .5s ease;}@keyframes fadeIn{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}`}</style>
    </div>
  );
} 