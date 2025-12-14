import React, { useEffect, useState } from "react";
import { apiFetch } from "../utils/apiFetch";

export default function AgregarUsuario() {
  const API_USER = import.meta.env.VITE_USER_API_URL;

  const [usuarios, setUsuarios] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const cargarUsuarios = async () => {
    try {
      const res = await apiFetch(`${API_USER}/api/users`);
      if (!res.ok) throw new Error("Error al cargar usuarios");
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar usuarios");
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (!name || !email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await apiFetch(`${API_USER}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role, // "USER" o "ADMIN"
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error al crear usuario");
      }

      setMensaje("Usuario creado correctamente");
      setName("");
      setEmail("");
      setPassword("");
      setRole("USER");

      // recargar lista
      cargarUsuarios();
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al crear usuario");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) return;

    try {
      const res = await apiFetch(`${API_USER}/api/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar usuario");
      setMensaje("Usuario eliminado");
      cargarUsuarios();
    } catch (err) {
      console.error(err);
      setError("Error al eliminar usuario");
    }
  };

  return (
    <main className="adminHome-main">
      <h1 className="h1-admin">Gestión de usuarios</h1>

      <section className="formulario-div">
        <h2>Agregar usuario</h2>
        <form onSubmit={handleSubmit} className="form-agregar-usuario">
          <label>Nombre*</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Correo*</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Contraseña*</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Rol*</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}

          <button type="submit">Guardar usuario</button>
        </form>
      </section>

      <section className="tabla-usuarios">
        <h2>Usuarios registrados</h2>
        {usuarios.length === 0 ? (
          <p>No hay usuarios registrados.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button onClick={() => handleDelete(u.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
