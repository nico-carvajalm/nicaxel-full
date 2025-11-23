import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LayoutPublic from './layouts/LayoutPublic';
import LayoutAdmin from './layouts/LayoutAdmin';

import Home from './pages/Home';
import Carrito from './pages/Carrito';
import Catalogo from './pages/Catalogo';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Nosotros from './pages/Nosotros';
import Register from './pages/Register';

import AdminHome from './pages/AdminHome';
import AgregarProducto from "./pages/AgregarProducto";
import AgregarUsuario from "./pages/AgregarUsuario";


//  RUTA PRIVADA SEGÚN ROL REAL
const PrivateRoute = ({ children }) => {
    const role = localStorage.getItem("role");
    return role === "ADMIN" ? children : <Navigate to="/login" />;
};

export default function App() {
    return (
        <Router>
            <Routes>

                {/* ----------------------- */}
                {/*         PÚBLICAS        */}
                {/* ----------------------- */}
                <Route element={<LayoutPublic />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/carrito" element={<Carrito />} />
                    <Route path="/catalogo" element={<Catalogo />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                {/* ----------------------- */}
                {/*          ADMIN          */}
                {/* ----------------------- */}
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

                {/* ----------------------- */}
                {/*         404             */}
                {/* ----------------------- */}
                <Route path="*" element={<h1>Página no encontrada</h1>} />
            </Routes>
        </Router>
    );
}
