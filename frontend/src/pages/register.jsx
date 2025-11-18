import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [errores, setErrores] = useState({
        nombre: "",
        correo: "",
        password: "",
        repeat: "",
    });

    const validarRegistro = (e) => {
        e.preventDefault();
        let valido = true;
        const nuevosErrores = { nombre: "", correo: "", password: "", repeat: "" };

        if (!nombre.trim()) {
            nuevosErrores.nombre = "El nombre no puede estar vacío.";
            valido = false;
        }

        if (!correo.includes("@")) {
            nuevosErrores.correo = "Ingrese un correo válido.";
            valido = false;
        }

        if (password1.length < 4) {
            nuevosErrores.password = "La contraseña debe tener al menos 4 caracteres.";
            valido = false;
        }

        if (password1 !== password2) {
            nuevosErrores.repeat = "Las contraseñas no coinciden.";
            valido = false;
        }

        setErrores(nuevosErrores);
        if (!valido) return;

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        if (usuarios.some(u => u.correo === correo)) {
            setErrores({ ...nuevosErrores, correo: "Ya existe un usuario con este correo." });
            return;
        }

        const nuevoUsuario = { nombre, correo, contraseña: password1, rol: "CLIENTE" };
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        navigate("/login");
    };

    return (
        <main className="form-main">
            <h1 className="form-h1">Regístrate</h1>

            <section className="formulario-div">
                <form id="formRegistro" onSubmit={validarRegistro}>
                    <label htmlFor="nombre">Nombre*</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Ingresa tu nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    {errores.nombre && <span style={{ color: "rgb(179, 56, 56)" }}>{errores.nombre}</span>}

                    <label htmlFor="correo">Correo electrónico*</label>
                    <input
                        type="email"
                        id="correo"
                        name="correo"
                        placeholder="ejemplo@gmail.com"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                    {errores.correo && <span style={{ color: "rgb(179, 56, 56)" }}>{errores.correo}</span>}

                    <label htmlFor="password1">Contraseña*</label>
                    <input
                        type="password"
                        id="password1"
                        name="password1"
                        placeholder="Ingresa tu nueva contraseña"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                    />
                    {errores.password && <span style={{ color: "rgb(179, 56, 56)" }}>{errores.password}</span>}

                    <label htmlFor="password2">Repetir contraseña*</label>
                    <input
                        type="password"
                        id="password2"
                        name="password2"
                        placeholder="Repite la contraseña"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                    {errores.repeat && <span style={{ color: "rgb(179, 56, 56)" }}>{errores.repeat}</span>}

                    <div className="remember-register-flex">
                        <div className="remember-me">
                            <input type="checkbox" className="checkbox" title="recordar-contraseña" />
                            Recordar contraseña
                        </div>
                        <span>
                            ¿Ya tienes cuenta?{" "}
                            <Link to="/login" className="register-here">
                                Iniciar sesión
                            </Link>
                        </span>
                    </div>

                    <button type="submit">Registrar</button>
                </form>
            </section>
        </main>
    );
}
