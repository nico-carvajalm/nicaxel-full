import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Carrito() {
    const [carrito, setCarrito] = useState(null);

    const API_CART = import.meta.env.VITE_CART_API_URL;
    const email = localStorage.getItem("email");

    useEffect(() => {
        console.log("CART API:", API_CART);
        console.log("EMAIL:", email);

        if (!email) return;

        fetch(`${API_CART}/api/cart/${email}`)
            .then((res) => res.json())
            .then((data) => setCarrito(data))
            .catch((err) => console.error("Error cargando carrito:", err));
    }, []);

    if (!carrito) return <h2>Cargando carrito...</h2>;

    if (!carrito.items || carrito.items.length === 0) {
        return (
            <main className="carrito-main">
                <h1>Tu carrito 🛍️</h1>
                <p className="carrito-vacio-text">
                    Tu carrito está vacío.{" "}
                    <Link to="/catalogo" className="ir-catalogo">
                        Ir al catálogo
                    </Link>
                </p>
            </main>
        );
    }

    const subtotal = carrito.items.reduce((acc, item) => {
        const price = item.finalPrice ?? item.price ?? 0;
        return acc + price * item.quantity;
    }, 0);

    return (
        <main className="carrito-main">
            <h1>Tu carrito 🛍️</h1>

            <section className="detalle">
                {carrito.items.map((item) => (
                    <article className="detalle-flex" key={item.itemId}>
                        
                        {/* Imagen del producto */}
                        <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                        />

                        {/* Nombre */}
                        <span className="perfume-nombre">
                            {item.name || "Producto"}
                        </span>

                        {/* Precio */}
                        <span className="perfume-precio">
                            ${ (item.finalPrice ?? item.price ?? 0).toLocaleString("es-CL") }
                        </span>

                        {/* Cantidad */}
                        <span>Cant: {item.quantity}</span>
                    </article>
                ))}
            </section>

            <section className="total">
                <article className="total-flex">
                    <h3>Total</h3>
                    <div className="total-precio-flex">
                        <span>CLP</span>
                        <span>${subtotal.toLocaleString("es-CL")}</span>
                    </div>
                </article>
            </section>

            <div className="pagar-button-div">
                <Link to="/" className="pagar">Completar pago</Link>
            </div>
        </main>
    );
}
