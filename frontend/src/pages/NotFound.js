import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="max-w-xl mx-auto pt-24 px-4 text-center">
      <h1 className="text-6xl font-bold mb-4 text-red-600">404</h1>
      <p className="text-lg mb-6">Página no encontrada.</p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition"
      >
        Ir al inicio
      </button>
    </div>
  );
} 