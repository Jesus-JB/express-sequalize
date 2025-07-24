import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import GaleriaForoCard from "../components/GaleriaForoCard";

export default function Home() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/users/publicos")
      .then(res => setUsuarios(res.data))
      .catch(() => setUsuarios([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto pt-24 px-4 text-center">
      <h1 className="text-4xl font-bold mb-6">Galerías de Usuarios</h1>
      <p className="text-lg mb-8">Explora, comenta y da like a las galerías públicas de todos los usuarios registrados.</p>
      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        </div>
      ) : (
        <div>
          {usuarios.map(user => (
            <GaleriaForoCard
              key={user._id}
              usuario={user}
              onVerGaleria={id => navigate(`/user/${id}/gallery`)}
            />
          ))}
        </div>
      )}
    </div>
  );
} 