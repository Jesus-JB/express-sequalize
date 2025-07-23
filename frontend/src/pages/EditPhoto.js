import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

export default function EditPhoto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [etiquetas, setEtiquetas] = useState([]); // seleccionadas
  const [allEtiquetas, setAllEtiquetas] = useState([]); // todas
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get(`/fotos/${id}`)
      .then(res => {
        setTitulo(res.data.titulo || "");
        setDescripcion(res.data.descripcion || "");
        setCalificacion(res.data.calificacion || "");
        setEtiquetas((res.data.etiquetas || []).map(et => et._id));
      })
      .catch(() => toast.error("Error al cargar la foto"));
    api.get("/etiquetas")
      .then(res => setAllEtiquetas(res.data))
      .catch(() => setAllEtiquetas([]));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("calificacion", calificacion);
    etiquetas.forEach(et => formData.append("etiquetas", et));
    if (imagen) formData.append("imagen", imagen);
    try {
      await api.put(`/fotos/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Foto actualizada correctamente");
      navigate("/gallery");
    } catch (err) {
      toast.error(err.response?.data?.error || "Error al actualizar la foto");
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
        <h2 className="text-2xl font-bold mb-6 text-center">Editar Foto</h2>
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
            <label className="block mb-2 font-medium">Imagen (opcional, reemplaza la actual)</label>
            <input
              type="file"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              onChange={e => setImagen(e.target.files[0])}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition transform hover:scale-105 flex items-center justify-center gap-2"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.646 9.646 8.003 8.003 0 0021.418 16c.908.287.95.752.81 1.22A11.95 11.95 0 0112 21.418c-2.35.088-4.387-.755-5.837-1.99L5 20.384M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            ) : (
              "Guardar Cambios"
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 