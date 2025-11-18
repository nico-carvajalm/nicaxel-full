import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Carrito() {
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("carrito")) || [];
        setCarrito(items);
    }, []);

    const eliminarDelCarrito = (id) => {
        const nuevoCarrito = carrito.filter(item => item.id !== id);
        setCarrito(nuevoCarrito);
        localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    };

    const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    return (
        <main className="carrito-main">
            <h1>Tu carrito 🛍️</h1>

            {carrito.length === 0 ? (
                <p className="carrito-vacio-text">Tu carrito está vacío. <Link to="/catalogo" className="ir-catalogo">Ir al catálogo</Link></p>
            ) : (
                <>
                    <section className="detalle">
                        {carrito.map((item) => (
                            <article className="detalle-flex" key={item.id}>
                                <img src={item.imagen} alt={item.nombre} />
                                <span className="perfume-nombre">{item.nombre}</span>
                                <span className="perfume-precio">
                                    ${item.precio.toLocaleString("es-CL")}
                                </span>
                                <span>Cant: {item.cantidad}</span>
                                <button 
                                    className="eliminar-carrito"
                                    onClick={() => eliminarDelCarrito(item.id)}
                                >
                                    ❌
                                </button>
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
                </>
            )}
        </main>
    );
}

