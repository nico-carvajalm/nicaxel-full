import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LayoutPublic from './layouts/LayoutPublic';
import LayoutAdmin from './layouts/LayoutAdmin';

import Home from './pages/Home';
import Carrito from './pages/Carrito';
import Catalogo from './pages/Catalogo';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Nosotros from './pages/Nosotros';
import Register from './pages/register';

import AdminHome from './pages/AdminHome';
import AgregarProducto from "./pages/AgregarProducto";
import AgregarUsuario from "./pages/AgregarUsuario";

const PrivateRoute = ({ children }) => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    return usuarioActivo && usuarioActivo.rol === "ADMIN" ? children : <Navigate to="/login" />;
};

export default function App() {
    
    useEffect(() => {
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        if (!usuarios.some(u => u.correo === "axel@admin.cl")) {
            usuarios.push({
                nombre: "Axel Soto",
                correo: "axel@admin.cl",
                contraseña: "aaaa",
                rol: "ADMIN",
            });
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
        }
    }, []);

    return (
        <Router>
            <Routes>
                {/* TIENDA */}
                <Route element={<LayoutPublic />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/carrito" element={<Carrito />} />
                    <Route path="/catalogo" element={<Catalogo />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                {/* ADMIN */}
                <Route element={<LayoutAdmin />}>
                    <Route
                        path="/adminHome"
                        element={
                            <PrivateRoute>
                                <AdminHome />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/addUser"
                        element={
                            <PrivateRoute>
                                <AgregarUsuario />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/addProduct"
                        element={
                            <PrivateRoute>
                                <AgregarProducto />
                            </PrivateRoute>
                        }
                    />
                </Route>

                <Route path="*" element={<h1>Página no encontrada</h1>} />
            </Routes>
        </Router>
    );
}

