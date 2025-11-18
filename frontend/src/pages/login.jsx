import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [recordar, setRecordar] = useState(false);

    const [errorCorreo, setErrorCorreo] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    useEffect(() => {
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        if (!usuarios.some(u => u.correo === "axel@admin.com")) {
            usuarios.push({
                nombre: "Axel Soto",
                correo: "axel@admin.com",
                contraseña: "aaaa",
                rol: "ADMIN",
            });
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
        }

        const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
        if (usuarioActivo) {
            navigate(usuarioActivo.rol === "ADMIN" ? "/adminHome" : "/");
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let valido = true;

        if (!correo.includes("@")) {
            setErrorCorreo("Ingresa un correo válido.");
            valido = false;
        } else setErrorCorreo("");

        if (password.length < 4) {
            setErrorPassword("La contraseña debe tener al menos 4 caracteres.");
            valido = false;
        } else setErrorPassword("");

        if (!valido) return;

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuarioPorCorreo = usuarios.find(u => u.correo === correo);

        if (!usuarioPorCorreo) {
            setErrorCorreo("El correo ingresado no está registrado.");
            setErrorPassword("");
            return;
        }

        if (usuarioPorCorreo.contraseña !== password) {
            setErrorCorreo("");
            setErrorPassword("Contraseña incorrecta.");
            return;
        }

        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioPorCorreo));
        window.dispatchEvent(new Event("usuarioLogueado"));
        navigate(usuarioPorCorreo.rol === "ADMIN" ? "/adminHome" : "/");
    };

    return (
        <main className="form-main">
            <h1 className="form-h1">Iniciar sesión</h1>

            <section className="formulario-div">
                <form onSubmit={handleSubmit} id="miFormulario" noValidate>
                    <label htmlFor="correo">Correo electrónico*</label>
                    <input
                        type="email"
                        id="correo"
                        name="correo"
                        placeholder="ejemplo@gmail.com"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                    {errorCorreo && <span style={{ color: "rgb(179, 56, 56)" }}>{errorCorreo}</span>}

                    <label htmlFor="password">Contraseña*</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Ingresa tu contraseña aquí"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorPassword && <span style={{ color: "rgb(179, 56, 56)" }}>{errorPassword}</span>}

                    <div className="remember-register-flex">
                        <div className="remember-me">
                            <input
                            type="checkbox"
                            className="checkbox"
                            id="recordar"
                            checked={recordar}
                            onChange={() => setRecordar(!recordar)}
                            />
                            <label htmlFor="recordar">Recordar contraseña</label>
                        </div>
                        <span>
                            ¿No tienes cuenta?{" "}
                            <Link to="/register" className="register-here">
                            Regístrate aquí
                            </Link>
                        </span>
                    </div>

                    <button type="submit">Iniciar sesión</button>
                </form>
            </section>
        </main>
    );
}
