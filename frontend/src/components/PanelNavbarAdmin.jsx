import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/panelAdmin.css"; 

export default function PanelNavbarAdmin() {
    const navigate = useNavigate();
    const [usuarioActivo, setUsuarioActivo] = useState(null);

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
        setUsuarioActivo(usuario);

        const actualizarUsuario = () => {
            const actualizado = JSON.parse(localStorage.getItem("usuarioActivo"));
            setUsuarioActivo(actualizado);
        };

        window.addEventListener("usuarioLogueado", actualizarUsuario);
        window.addEventListener("usuarioLogout", actualizarUsuario);

        return () => {
            window.removeEventListener("usuarioLogueado", actualizarUsuario);
            window.removeEventListener("usuarioLogout", actualizarUsuario);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("usuarioActivo");
        setUsuarioActivo(null);
        window.dispatchEvent(new Event("usuarioLogout"));
        navigate("/login");
    };

    return (
        <div className="navbar-admin">
            <h1>
                <Link to="/adminHome">
                    {usuarioActivo ? `Admin - ${usuarioActivo.nombre}` : "Administrador"}
                </Link>
            </h1>

            <div className="navbar-right">
                <Link to="/addUser">
                    <img src="/Img/addUser.svg" alt="Agregar Usuario" />
                </Link>
                <Link to="/addProduct">
                    <img src="/Img/newItem.svg" alt="Agregar Producto" />
                </Link>

                {usuarioActivo ? (
                    <button
                        onClick={handleLogout}
                        style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                        }}
                        title="Cerrar sesión"
                    >
                        <img src="/Img/logoutBlack.svg" alt="Logout icon" />
                    </button>
                ) : (
                    <Link to="/login">
                        <img src="/Img/login.svg" alt="Login icon" />
                    </Link>
                )}
            </div>
        </div>
    );
}
