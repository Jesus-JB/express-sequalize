import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadPhoto() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [etiquetas, setEtiquetas] = useState([]); // seleccionadas
  const [allEtiquetas, setAllEtiquetas] = useState([]); // todas
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/etiquetas")
      .then(res => setAllEtiquetas(res.data))
      .catch(() => setAllEtiquetas([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("calificacion", calificacion);
    etiquetas.forEach(et => formData.append("etiquetas", et));
    formData.append("imagen", imagen);

    try {
      await api.post("/fotos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Foto subida correctamente");
      toast.success("Foto subida correctamente");
      setTimeout(() => navigate("/gallery"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Error al subir la foto");
      toast.error(err.response?.data?.error || "Error al subir la foto");
    } finally {
      setLoading(false);
    }
  };

  const handleEtiquetasChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setEtiquetas(selected);
  };

  return (
    <div className="max-w-md mx-auto pt-24 px-4">
      <div className="bg-white rounded shadow p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Subir Foto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 font-medium">Título</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium">Descripción</label>
            <textarea
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              required
              rows={3}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium">Calificación (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              value={calificacion}
              onChange={e => setCalificacion(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium">Etiquetas</label>
            <select
              multiple
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              value={etiquetas}
              onChange={handleEtiquetasChange}
            >
              {allEtiquetas.map(et => (
                <option key={et._id} value={et._id} className="text-gray-900">{et.nombre}</option>
              ))}
            </select>
            <div className="text-xs text-gray-500 mt-1">Ctrl+Click para seleccionar varias</div>
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium">Imagen</label>
            <input
              type="file"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              onChange={e => setImagen(e.target.files[0])}
              required
            />
          </div>
          {error && (
            <div className="mb-4 text-red-600 text-center flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 text-green-600 text-center flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              {success}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition transform hover:scale-105 flex items-center justify-center gap-2"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.646 9.646 8.003 8.003 0 0021.418 16c.908.287.95.752.81 1.22A11.95 11.95 0 0112 21.418c-2.35.088-4.387-.755-5.837-1.99L5 20.384M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            ) : (
              "Subir"
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 