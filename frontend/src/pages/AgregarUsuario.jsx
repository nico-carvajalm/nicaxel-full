import React, { useState, useContext } from "react";
import { AdminContext } from "../layouts/LayoutAdmin";
import "../styles/agregarUsuario.css";

export default function AgregarUsuario() {
    
    const { usuarios, setUsuarios } = useContext(AdminContext);
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: "",
        correo: "",
        contraseña: "",
        rol: "",
    });
    const [errores, setErrores] = useState({});
    const [editando, setEditando] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoUsuario({ ...nuevoUsuario, [name]: value });
        setErrores({ ...errores, [name]: "" });
    };

    const validarCampos = () => {
        let nuevosErrores = {};

        if (!nuevoUsuario.nombre.trim())
            nuevosErrores.nombre = "El nombre no puede estar vacío.";

        if (!nuevoUsuario.correo.trim())
            nuevosErrores.correo = "El correo no puede estar vacío.";
        else if (!/\S+@\S+\.\S+/.test(nuevoUsuario.correo))
            nuevosErrores.correo = "El correo no tiene un formato válido.";

        if (
            nuevoUsuario.rol === "ADMIN" &&
            !nuevoUsuario.correo.endsWith("@admin.com")
        ) {
            nuevosErrores.correo =
                "Si el rol es ADMIN, el correo debe terminar en '@admin.com'.";
        }

        if (!nuevoUsuario.contraseña.trim())
            nuevosErrores.contraseña = "La contraseña no puede estar vacía.";
        else if (nuevoUsuario.contraseña.length < 4)
            nuevosErrores.contraseña = "Debe tener al menos 4 caracteres.";

        if (!nuevoUsuario.rol.trim())
            nuevosErrores.rol = "Debes seleccionar un rol.";

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleAgregar = (e) => {
        e.preventDefault();
        if (!validarCampos()) return;

        const correoExistente = usuarios.some(
            (u, i) => u.correo === nuevoUsuario.correo && i !== editando
        );
        if (correoExistente) {
            setErrores({ correo: "Ya existe un usuario con este correo." });
            return;
        }

        if (editando !== null) {
            const actualizados = usuarios.map((u, i) =>
                i === editando ? nuevoUsuario : u
            );
            setUsuarios(actualizados);
            setEditando(null);
        } else {
            setUsuarios([...usuarios, nuevoUsuario]);
        }

        setNuevoUsuario({ nombre: "", correo: "", contraseña: "", rol: "" });
        setErrores({});
    };

    const handleEditar = (index) => {
        setNuevoUsuario(usuarios[index]);
        setEditando(index);
    };

    const handleEliminar = (index) => {
        setUsuarios(usuarios.filter((_, i) => i !== index));
    };

    return (
        <>
            <h1 className="h1-admin">Gestión de usuarios</h1>
            <main className="gestionUsuarios-main">
                <form className="form-usuario" onSubmit={handleAgregar}>
                    <div className="campo">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={nuevoUsuario.nombre}
                            onChange={handleChange}
                        />
                        {errores.nombre && (
                            <p className="error">{errores.nombre}</p>
                        )}
                    </div>

                    <div className="campo">
                        <input
                            type="email"
                            name="correo"
                            placeholder="Correo"
                            value={nuevoUsuario.correo}
                            onChange={handleChange}
                        />
                        {errores.correo && (
                            <p className="error">{errores.correo}</p>
                        )}
                    </div>

                    <div className="campo">
                        <input
                            type="password"
                            name="contraseña"
                            placeholder="Contraseña"
                            value={nuevoUsuario.contraseña}
                            onChange={handleChange}
                        />
                        {errores.contraseña && (
                            <p className="error">{errores.contraseña}</p>
                        )}
                    </div>

                    <div className="campo">
                        <select
                            name="rol"
                            value={nuevoUsuario.rol}
                            onChange={handleChange}
                            className="select-rol"
                        >
                            <option value="">Seleccionar rol</option>
                            <option value="ADMIN">Admin</option>
                            <option value="CLIENTE">Cliente</option>
                        </select>
                        {errores.rol && <p className="error">{errores.rol}</p>}
                    </div>

                    <button type="submit">
                        {editando !== null
                            ? "Actualizar usuario"
                            : "Agregar usuario"}
                    </button>
                </form>

                <table className="tabla-usuarios">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Contraseña</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.length === 0 ? (
                            <tr>
                                <td colSpan="5">
                                    No hay usuarios registrados
                                </td>
                            </tr>
                        ) : (
                            usuarios.map((u, index) => (
                                <tr key={index}>
                                    <td>{u.nombre}</td>
                                    <td>{u.correo}</td>
                                    <td>
                                        {"•".repeat(u.contraseña.length)}
                                    </td>
                                    <td>{u.rol}</td>
                                    <td>
                                        <div className="acciones-flex">
                                            <button
                                                onClick={() => handleEditar(index)}
                                                className="edit-button"
                                                >
                                                <img src="/Img/edit.svg" alt="Editar" />
                                            </button>
                                            <button
                                                onClick={() => handleEliminar(index)}
                                                className="delete-button"
                                                >
                                                <img src="/Img/delete.svg" alt="Eliminar" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </main>
        </>
    );
}
