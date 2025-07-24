import { useState } from "react";

export default function CrearCarpetaForm({ onCrear }) {
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }
    setLoading(true);
    try {
      await onCrear(nombre.trim());
      setNombre("");
    } catch (err) {
      setError(err?.message || "Error al crear carpeta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6 items-center">
      <input
        type="text"
        className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Nueva carpeta"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition transform hover:scale-105"
      >
        Crear
      </button>
      {error && <span className="text-red-600 text-sm ml-2">{error}</span>}
    </form>
  );
} 