import React, { useState } from "react";
import { toast } from "react-toastify";

export default function AgregarProducto() {

    const API_URL = import.meta.env.VITE_API_URL;

    const [form, setForm] = useState({
        name: "",
        brand: "",
        stock: "",
        price: "",
        finalPrice: ""
    });

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Enviar petición al backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/api/products`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    brand: form.brand,
                    stock: Number(form.stock),
                    price: Number(form.price),
                    finalPrice: Number(form.finalPrice),
                    imageUrl: ""   
                })
            });

            if (!response.ok) {
                toast.error("Error creando producto");
                return;
            }

            toast.success("Producto creado correctamente ✔");

            // Limpiar formulario
            setForm({
                name: "",
                brand: "",
                stock: "",
                price: "",
                finalPrice: ""
            });

        } catch (error) {
            console.error(error);
            toast.error("Error de conexión con el servidor");
        }
    };

    return (
        <main className="adminHome-main">
            <h1 className="h1-admin">Agregar producto</h1>

            <form onSubmit={handleSubmit} className="form-admin">

                <label>Nombre</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <label>Marca</label>
                <input
                    type="text"
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    required
                />

                <label>Stock</label>
                <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    required
                />

                <label>Precio Original</label>
                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                />

                <label>Precio Final</label>
                <input
                    type="number"
                    name="finalPrice"
                    value={form.finalPrice}
                    onChange={handleChange}
                    required
                />

                <button type="submit" className="btn-agregar">
                    Crear producto
                </button>
            </form>
        </main>
    );
}
