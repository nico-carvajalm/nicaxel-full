import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const API_USER = window.location.hostname === "localhost"
    ? "http://localhost:8081"
    : "http://host.docker.internal:8081";


    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`${API_USER}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: correo,
                    password: password
                })
            });

            if (!response.ok) {
                setError("Correo o contraseña incorrectos.");
                return;
            }

            const data = await response.json();

            // guardar token y datos del usuario en localStorage
            localStorage.setItem("usuarioActivo", JSON.stringify(data));
            localStorage.setItem("role", data.role);



            // avisar al navbar
            window.dispatchEvent(new Event("usuarioLogueado"));

            // redirigir según rol
            if (data.role === "ADMIN") {
                navigate("/adminHome");
            } else {
                navigate("/");
            }

        } catch (err) {
            console.error("Error en login:", err);
            setError("Error de conexión con el servidor.");
        }
    };

    return (
        <main className="form-main">
            <h1 className="form-h1">Iniciar sesión</h1>

            <section className="formulario-div">
                <form onSubmit={handleSubmit}>
                    <label>Correo electrónico*</label>
                    <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />

                    <label>Contraseña*</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <span style={{ color: "red" }}>{error}</span>}

                    <button type="submit">Iniciar sesión</button>

                    <Link to="/register" className="register-here">
                        ¿No tienes cuenta? Regístrate aquí
                    </Link>
                </form>
            </section>
        </main>
    );
}
