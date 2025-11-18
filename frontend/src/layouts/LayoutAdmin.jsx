import React, { createContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import PanelNavbarAdmin from "../components/PanelNavbarAdmin";

export const AdminContext = createContext();

export default function LayoutAdmin() {
    const [usuarios, setUsuarios] = useState(() => {
        const guardados = localStorage.getItem("usuarios");
        return guardados ? JSON.parse(guardados) : [];
    });

    useEffect(() => {
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }, [usuarios]);

    return (
        <AdminContext.Provider value={{ usuarios, setUsuarios }}>
        <div className="layout-admin">
            <PanelNavbarAdmin />
            <Outlet />
        </div>
        </AdminContext.Provider>
    );
}
