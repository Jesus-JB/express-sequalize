import { useEffect, useState } from "react";
import api from "../api";

export default function LikeButton({ fotoId }) {
  const [total, setTotal] = useState(0);
  const [dadoLike, setDadoLike] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLikes = () => {
    api.get(`/users/fotos/${fotoId}/likes`)
      .then(res => {
        setTotal(res.data.total);
        setDadoLike(res.data.dadoLike);
      })
      .catch(() => {
        setTotal(0);
        setDadoLike(false);
      });
  };

  useEffect(() => {
    fetchLikes();
    // eslint-disable-next-line
  }, [fotoId]);

  const handleLike = async () => {
    setLoading(true);
    setError("");
    try {
      if (dadoLike) {
        await api.post(`/users/fotos/${fotoId}/unlike`);
      } else {
        await api.post(`/users/fotos/${fotoId}/like`);
      }
      fetchLikes();
    } catch (err) {
      setError("Debes iniciar sesión para dar like.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLike}
        disabled={loading}
        className={`px-3 py-1 rounded font-semibold transition text-white ${dadoLike ? "bg-pink-600 hover:bg-pink-700" : "bg-gray-400 hover:bg-pink-500"}`}
        title={dadoLike ? "Quitar like" : "Dar like"}
      >
        {dadoLike ? "♥" : "♡"}
      </button>
      <span className="text-pink-700 font-bold text-lg">{total}</span>
      {error && <span className="text-red-600 text-xs ml-2">{error}</span>}
    </div>
  );
} 