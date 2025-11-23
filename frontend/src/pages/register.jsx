import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const API_USER = import.meta.env.VITE_USER_API_URL;

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const [errores, setErrores] = useState({});

    const validarRegistro = async (e) => {
        e.preventDefault();
        let valido = true;
        let nuevosErrores = {};

        if (!nombre.trim()) {
            nuevosErrores.nombre = "El nombre no puede estar vacío.";
            valido = false;
        }

        if (!correo.includes("@")) {
            nuevosErrores.correo = "Correo inválido.";
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

        try {
            const response = await fetch(`${API_USER}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: nombre,
                    email: correo,
                    password: password1,
                    role: "USER"
                })
            });

            if (response.ok) {
                navigate("/login");
            } else {
                setErrores({ correo: "El correo ya está registrado." });
            }

        } catch (err) {
            console.error("Error registrando:", err);
        }
    };

    return (
        <main className="form-main">
            <h1 className="form-h1">Regístrate</h1>

            <section className="formulario-div">
                <form onSubmit={validarRegistro}>
                    <label>Nombre*</label>
                    <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    {errores.nombre && <span style={{ color: "red" }}>{errores.nombre}</span>}

                    <label>Email*</label>
                    <input value={correo} onChange={(e) => setCorreo(e.target.value)} />
                    {errores.correo && <span style={{ color: "red" }}>{errores.correo}</span>}

                    <label>Contraseña*</label>
                    <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} />
                    {errores.password && <span style={{ color: "red" }}>{errores.password}</span>}

                    <label>Repetir contraseña*</label>
                    <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                    {errores.repeat && <span style={{ color: "red" }}>{errores.repeat}</span>}

                    <button type="submit">Registrar</button>

                    <div className="remember-register-flex">
                        <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
                    </div>
                </form>
            </section>
        </main>
    );
}
