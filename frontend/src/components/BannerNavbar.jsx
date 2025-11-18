import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/main.css";

export default function BannerNavbar() {
    const navigate = useNavigate();
    const [usuarioActivo, setUsuarioActivo] = useState(null);
    const [menuAbierto, setMenuAbierto] = useState(false); 

    useEffect(() => {
        const actualizarUsuario = () => {
            const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
            setUsuarioActivo(usuario);
        };

        actualizarUsuario();
        window.addEventListener("usuarioLogueado", actualizarUsuario);

        return () => window.removeEventListener("usuarioLogueado", actualizarUsuario);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("usuarioActivo");
        setUsuarioActivo(null);
        window.dispatchEvent(new Event("usuarioLogueado"));
        navigate("/login");
        setMenuAbierto(false);
    };

    return (
        <div className="sticky">
            {/* Banner */}
            <div className="banner-div">
                <span className="banner">
                    Aprovecha solo por esta semana hasta un <span>60%</span> en productos
                    seleccionados.{" "}
                    <Link to="/catalogo" className="pincha">
                        Pincha aquí para más info.
                    </Link>{" "}
                    <i className="fa-solid fa-hand-pointer fa-xs" style={{ color: "#ffffff" }}></i>
                </span>
            </div>

            {/* Navbar Mobile */}
            <nav className="navbar-mobile">
                <div className="navbar-mobile-top">
                    <Link to="/" className="tittle">
                        NICAXEL
                    </Link>

                    <button
                        className="burger-button"
                        onClick={() => setMenuAbierto(!menuAbierto)}
                        aria-label="Abrir menú"
                    >
                        <i className={`fa-solid ${menuAbierto ? "fa-xmark" : "fa-bars"}`}></i>
                    </button>
                </div>
                
                <ul className="nav-menu nav-menu--a11y">
                <li className="nav-item"><Link className="nav-link" to="/nosotros">Sobre nosotros</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/blog">Blog</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/catalogo">Catálogo</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/login">Iniciar sesión</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/carrito">Ver carrito 🛒(1)</Link></li>
                </ul>


                {menuAbierto && (
                    <div className="burger-menu">
                        <Link to="/nosotros" onClick={() => setMenuAbierto(false)}>Sobre nosotros</Link>
                        <Link to="/catalogo" onClick={() => setMenuAbierto(false)}>Catálogo</Link>
                        <Link to="/contacto" onClick={() => setMenuAbierto(false)}>Contacto</Link>

                        {!usuarioActivo ? (
                                <Link to="/login" onClick={() => setMenuAbierto(false)} className="logout-button-flex">
                                    <img src="/Img/login.svg" alt="Login icon" /> 
                                    <span>Iniciar sesión</span>
                                </Link>
                        ) : (
                            <button onClick={handleLogout} className="logout-button-flex">
                                <img src="/Img/logoutBlack.svg" alt="Logout icon" />
                                <span>Cerrar sesión</span>
                            </button>
                        )}

                        <Link
                            to="/carrito"
                            className="carrito-mobile"
                            onClick={() => setMenuAbierto(false)}
                        >
                            <img src="/Img/carrito.svg" alt="Carrito" />
                            <span>Ver carrito</span>
                        </Link>
                    </div>
                )}
            </nav>

            {/* Navbar Desktop */}
            <nav className="navbar-dekstop">
                <Link to="/" className="tittle">
                    NICAXEL
                </Link>

                <div className="nav-medio">
                    <Link to="/nosotros">Sobre nosotros</Link>
                    <Link to="/catalogo" className="navbar-contacto">Catálogo</Link>
                    <Link to="/contacto" className="navbar-contacto">Contacto</Link>
                </div>

                <div className="nav-derecha">
                    {!usuarioActivo ? (
                        <Link to="/login">
                            <img src="/Img/login.svg" alt="Icono de login" />
                        </Link>
                    ) : (
                        <button
                            onClick={handleLogout}
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                            }}
                        >
                            <img src="/Img/logoutBlack.svg" alt="Icono de logout" />
                        </button>
                    )}

                    <div className="carrito-flex">
                        <Link to="/carrito">
                            <img src="/Img/carrito.svg" alt="Icono de carrito" />
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}


