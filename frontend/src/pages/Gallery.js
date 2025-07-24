import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import CrearCarpetaForm from "../components/CrearCarpetaForm";
import CarpetasList from "../components/CarpetasList";
import SubirFotoForm from "../components/SubirFotoForm";
import FotosSueltasList from "../components/FotosSueltasList";

export default function Gallery() {
  const [carpetas, setCarpetas] = useState([]);
  const [fotosSueltas, setFotosSueltas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Proteger la galería: solo usuarios autenticados
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      api.get("/carpetas"),
      api.get("/fotos")
    ])
      .then(([carpetasRes, fotosRes]) => {
        setCarpetas(carpetasRes.data);
        setFotosSueltas((fotosRes.data || []).filter(f => !f.carpeta));
        setError("");
      })
      .catch(() => {
        setCarpetas([]);
        setFotosSueltas([]);
        setError("No se pudo cargar la galería");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Crear carpeta
  const handleCrearCarpeta = async (nombre) => {
    await api.post("/carpetas", { nombre });
    fetchData();
  };

  // Eliminar carpeta
  const handleEliminarCarpeta = async (id) => {
    if (!window.confirm("¿Eliminar esta carpeta y todas sus fotos?")) return;
    await api.delete(`/carpetas/${id}`);
    fetchData();
  };

  // Navegar a carpeta personal
  const handleVerCarpeta = (id) => {
    navigate(`/carpeta/${id}`);
  };

  // Subir foto
  const handleSubirFoto = async (formData) => {
    await api.post("/fotos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    fetchData();
  };

  // Eliminar foto suelta
  const handleEliminarFoto = async (id) => {
    if (!window.confirm("¿Eliminar esta foto?")) return;
    await api.delete(`/fotos/${id}`);
    fetchData();
  };

  return (
    <div className="max-w-4xl mx-auto pt-24 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Mi Galería Personal</h1>
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        </div>
      ) : (
        <>
          <CrearCarpetaForm onCrear={handleCrearCarpeta} />
          <CarpetasList
            carpetas={carpetas}
            onVerCarpeta={handleVerCarpeta}
            onEliminarCarpeta={handleEliminarCarpeta}
          />
          <SubirFotoForm carpetas={carpetas} onSubir={handleSubirFoto} />
          <h2 className="text-xl font-semibold mb-2 mt-6">Fotos sueltas</h2>
          <FotosSueltasList fotos={fotosSueltas} onEliminarFoto={handleEliminarFoto} />
        </>
      )}
    </div>
  );
} 