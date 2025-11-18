import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/adminHome.css"; 
import { AdminContext } from "../layouts/LayoutAdmin"; 

export default function AdminHome() {
    const { usuarios } = useContext(AdminContext); 

    return (
        <>
            <main className="adminHome-main">
                <h1 className="h1-admin">Home</h1>

                <div className="gestion-container">

                    <Link to="/addUser" className="gestion-card">
                        <span>Usuarios</span>
                        <div className="gestion-card-right">
                            <img src="/public/Img/userWhite.svg" alt="User Icon" />
                            <span>({usuarios.length})</span> 
                        </div>
                    </Link>

                    <Link to="/addProduct" className="gestion-card">
                        <span>Productos</span>
                        <div className="gestion-card-right">
                            <img src="/public/Img/qr.svg" alt="QR Code" />
                            <span>()</span>
                        </div>
                    </Link>

                </div>
            </main>
        </>
    );
}
