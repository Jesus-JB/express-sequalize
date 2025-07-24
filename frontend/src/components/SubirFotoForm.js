import { useState } from "react";

export default function SubirFotoForm({ carpetas, onSubir }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [carpeta, setCarpeta] = useState("");
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!titulo.trim() || !descripcion.trim() || !calificacion || !imagen) {
      setError("Todos los campos son obligatorios (excepto carpeta)");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("descripcion", descripcion);
      formData.append("calificacion", calificacion);
      if (carpeta) formData.append("carpeta", carpeta);
      formData.append("imagen", imagen);
      await onSubir(formData);
      setTitulo("");
      setDescripcion("");
      setCalificacion("");
      setCarpeta("");
      setImagen(null);
    } catch (err) {
      setError(err?.message || "Error al subir la foto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 mb-8 flex flex-col gap-4">
      <h2 className="text-lg font-bold mb-2">Subir Foto</h2>
      <input
        type="text"
        className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        disabled={loading}
        required
      />
      <textarea
        className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Descripción"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
        disabled={loading}
        required
        rows={2}
      />
      <input
        type="number"
        min="1"
        max="5"
        className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Calificación (1-5)"
        value={calificacion}
        onChange={e => setCalificacion(e.target.value)}
        disabled={loading}
        required
      />
      <select
        className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={carpeta}
        onChange={e => setCarpeta(e.target.value)}
        disabled={loading}
      >
        <option value="">Sin carpeta (foto suelta)</option>
        {carpetas && carpetas.map(c => (
          <option key={c._id} value={c._id}>{c.nombre}</option>
        ))}
      </select>
      <input
        type="file"
        className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={e => setImagen(e.target.files[0])}
        disabled={loading}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition"
      >
        {loading ? "Subiendo..." : "Subir"}
      </button>
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
    </form>
  );
} 