import { useEffect, useState } from "react";
import api from "../api";

export default function ComentariosGaleria({ fotoId }) {
  const [comentarios, setComentarios] = useState([]);
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const fetchComentarios = () => {
    api.get(`/users/fotos/${fotoId}/comentarios`)
      .then(res => setComentarios(res.data))
      .catch(() => setComentarios([]));
  };

  useEffect(() => {
    fetchComentarios();
    // eslint-disable-next-line
  }, [fotoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!texto.trim()) {
      setError("El comentario no puede estar vacío.");
      return;
    }
    setEnviando(true);
    try {
      await api.post(`/users/fotos/${fotoId}/comentarios`, { texto });
      setTexto("");
      fetchComentarios();
    } catch (err) {
      setError("Debes iniciar sesión para comentar.");
    } finally {
      setEnviando(false);
    }
  };

  // Verifica si el usuario está autenticado
  const isAuth = !!localStorage.getItem("token");

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Comentarios</h3>
      {comentarios.length === 0 ? (
        <div className="text-gray-500 mb-2">Aún no hay comentarios.</div>
      ) : (
        <ul className="mb-2 max-h-48 overflow-y-auto">
          {comentarios.map(com => (
            <li key={com._id} className="mb-2 border-b pb-1">
              <span className="font-bold text-blue-700">{com.usuario?.email || "Usuario"}:</span> {com.texto}
              <span className="text-xs text-gray-400 ml-2">{new Date(com.fecha).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
      {isAuth && (
        <form onSubmit={handleSubmit} className="flex gap-2 items-center mt-2">
          <input
            type="text"
            className="flex-1 border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Escribe un comentario..."
            value={texto}
            onChange={e => setTexto(e.target.value)}
            disabled={enviando}
          />
          <button
            type="submit"
            disabled={enviando}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded font-semibold transition"
          >
            Comentar
          </button>
          {error && <span className="text-red-600 text-xs ml-2">{error}</span>}
        </form>
      )}
      {!isAuth && <div className="text-xs text-gray-500 mt-2">Inicia sesión para comentar.</div>}
    </div>
  );
} 