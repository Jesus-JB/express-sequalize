import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [nombre, setNombre] = useState("");
  const [editId, setEditId] = useState(null);
  const [editNombre, setEditNombre] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTags = () => {
    api.get("/etiquetas").then(res => setTags(res.data)).catch(() => setTags([]));
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    setLoading(true);
    try {
      await api.post("/etiquetas", { nombre });
      toast.success("Etiqueta creada");
      setNombre("");
      fetchTags();
    } catch {
      toast.error("Error al crear etiqueta");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tag) => {
    setEditId(tag._id);
    setEditNombre(tag.nombre);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editNombre.trim()) return;
    setLoading(true);
    try {
      await api.put(`/etiquetas/${editId}`, { nombre: editNombre });
      toast.success("Etiqueta actualizada");
      setEditId(null);
      setEditNombre("");
      fetchTags();
    } catch {
      toast.error("Error al actualizar etiqueta");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta etiqueta?")) return;
    setLoading(true);
    try {
      await api.delete(`/etiquetas/${id}`);
      toast.success("Etiqueta eliminada");
      fetchTags();
    } catch {
      toast.error("Error al eliminar etiqueta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-24 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Gestión de Etiquetas</h1>
      <form onSubmit={handleCreate} className="flex gap-2 mb-6">
        <input
          type="text"
          className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Nueva etiqueta"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition transform hover:scale-105">
          Crear
        </button>
      </form>
      <div className="bg-white rounded shadow p-4">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Nombre</th>
              <th className="py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tags.map(tag => (
              <tr key={tag._id} className="border-t">
                <td className="py-2">
                  {editId === tag._id ? (
                    <form onSubmit={handleUpdate} className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                        value={editNombre}
                        onChange={e => setEditNombre(e.target.value)}
                        disabled={loading}
                      />
                      <button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded font-semibold transition">Guardar</button>
                      <button type="button" onClick={() => setEditId(null)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded font-semibold transition">Cancelar</button>
                    </form>
                  ) : (
                    <span className="text-gray-900">{tag.nombre}</span>
                  )}
                </td>
                <td className="py-2 text-center">
                  {editId !== tag._id && (
                    <>
                      <button onClick={() => handleEdit(tag)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded font-semibold mr-2 transition">Editar</button>
                      <button onClick={() => handleDelete(tag._id)} className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded font-semibold transition">Eliminar</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 