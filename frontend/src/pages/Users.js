import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";

const roles = ["admin", "usuario"];

export default function Users() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("usuario");
  const [editId, setEditId] = useState(null);
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editRol, setEditRol] = useState("usuario");
  const [loading, setLoading] = useState(false);

  const fetchUsers = () => {
    api.get("/users").then(res => setUsers(res.data)).catch(() => setUsers([]));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setLoading(true);
    try {
      await api.post("/users", { email, password, rol });
      toast.success("Usuario creado");
      setEmail("");
      setPassword("");
      setRol("usuario");
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.error || "Error al crear usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setEditEmail(user.email);
    setEditPassword("");
    setEditRol(user.rol);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editEmail.trim()) return;
    setLoading(true);
    try {
      await api.put(`/users/${editId}`, {
        email: editEmail,
        password: editPassword || undefined,
        rol: editRol
      });
      toast.success("Usuario actualizado");
      setEditId(null);
      setEditEmail("");
      setEditPassword("");
      setEditRol("usuario");
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.error || "Error al actualizar usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este usuario?")) return;
    setLoading(true);
    try {
      await api.delete(`/users/${id}`);
      toast.success("Usuario eliminado");
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.error || "Error al eliminar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-24 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Gestión de Usuarios</h1>
      <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-2 mb-6 items-center">
        <input
          type="email"
          className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
        />
        <select
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={rol}
          onChange={e => setRol(e.target.value)}
          disabled={loading}
        >
          {roles.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition transform hover:scale-105">
          Crear
        </button>
      </form>
      <div className="bg-white rounded shadow p-4">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Email</th>
              <th className="py-2">Rol</th>
              <th className="py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-t">
                <td className="py-2">
                  {editId === user._id ? (
                    <form onSubmit={handleUpdate} className="flex gap-2 items-center">
                      <input
                        type="email"
                        className="flex-1 border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={editEmail}
                        onChange={e => setEditEmail(e.target.value)}
                        disabled={loading}
                      />
                      <input
                        type="password"
                        className="flex-1 border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Nueva contraseña (opcional)"
                        value={editPassword}
                        onChange={e => setEditPassword(e.target.value)}
                        disabled={loading}
                      />
                      <select
                        className="border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={editRol}
                        onChange={e => setEditRol(e.target.value)}
                        disabled={loading}
                      >
                        {roles.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded font-semibold transition">Guardar</button>
                      <button type="button" onClick={() => setEditId(null)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded font-semibold transition">Cancelar</button>
                    </form>
                  ) : (
                    user.email
                  )}
                </td>
                <td className="py-2">{editId === user._id ? null : user.rol}</td>
                <td className="py-2 text-center">
                  {editId !== user._id && (
                    <>
                      <button onClick={() => handleEdit(user)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded font-semibold mr-2 transition">Editar</button>
                      <button onClick={() => handleDelete(user._id)} className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded font-semibold transition">Eliminar</button>
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