import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 


const listaPerfumes = [
    {
        imagen: "/Img/212vip.jpg", 
        id: 1,
        nombre: "212 VIP",
        precio: 89990,
        descripcion: "Perfume masculino elegante y moderno, con notas de ron, vainilla y frutas.",
        categoria: "Carolina Herrera"
    },
    {
        imagen: "/Img/AcquaDiGio.jpeg",
        id: 2,
        nombre: "Acqua di Gio",
        precio: 139990,
        descripcion: "Fragancia masculina fresca y acuática, con notas de cítricos y jazmín.",
        categoria: "Giorgio Armani"
    },
    {
        imagen: "/Img/Asad.jpeg",
        id: 3,
        nombre: "Asad",
        precio: 29890,
        descripcion: "Perfume árabe masculino con notas amaderadas y especiadas, elegante y duradero.",
        categoria: "Lattafa"
    },
    {
        imagen: "/Img/azzaro.jpeg",
        id: 4,
        nombre: "Azzaro Most Wanted",
        precio: 99990,
        descripcion: "Fragancia masculina moderna con notas de menta, especias y madera de cedro.",
        categoria: "Azzaro"
    },
    {
        imagen: "/Img/eros.jpg",
        id: 5,
        nombre: "Versace Eros EDT",
        precio: 79990,
        descripcion: "Perfume masculino fresco y sensual, con notas de menta, manzana verde y vainilla.",
        categoria: "Versace"
    },
    {
        imagen: "/Img/Nitro-Red.jpeg",
        id: 6,
        nombre: "Nitro Red",
        precio: 19990,
        descripcion: "Fragancia árabe masculina intensa y duradera, ideal para ocasiones especiales.",
        categoria: "Al Haramain"
    },
    {
        imagen: "/Img/Paris-Corner.jpeg",
        id: 7,
        nombre: "Paris Corner",
        precio: 69990,
        descripcion: "Perfume árabe unisex con aroma dulce y floral, inspirado en fragancias clásicas de diseñador.",
        categoria: "Paris Corner"
    },
    {
        imagen: "/Img/Yara-Lattafa.jpeg",
        id: 8,
        nombre: "Yara",
        precio: 84990,
        descripcion: "Fragancia árabe femenina con notas florales y frutales, elegante y delicada.",
        categoria: "Lattafa"
    },
    {
        imagen: "/Img/LeMaleElixir.jpeg",
        id: 9,
        nombre: "LeMale Elixir",
        precio: 119990,
        descripcion: "Perfume masculino oriental y dulce, con notas de vainilla, menta y lavanda.",
        categoria: "Jean Paul Gaultier"
    },
    {
        imagen: "/Img/Hawas.jpeg",
        id: 10,
        nombre: "Hawas Ice",
        precio: 29990,
        descripcion: "Fragancia árabe masculina fresca y deportiva, con notas frutales y amaderadas.",
        categoria: "Rasasi"
    },
    {
        imagen: "/Img/Eclaire-Lattafa.jpeg",
        id: 11,
        nombre: "Eclaire de Lattafa",
        precio: 89990,
        descripcion: "Perfume árabe femenino con aroma dulce y floral, elegante y duradero.",
        categoria: "Lattafa"
    }
];


export default function Catalogo() {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(300000);
    const [selectedCategory, setSelectedCategory] = useState("todos");
    const [filteredProducts, setFilteredProducts] = useState(listaPerfumes);

    const handleFilterClick = () => {
        const newFilteredParfums = listaPerfumes.filter((product) => {
            const priceInRange = product.precio >= minPrice && product.precio <= maxPrice;
            const inSelectedCategory =
                selectedCategory === "todos" || product.categoria === selectedCategory;
            return priceInRange && inSelectedCategory;
        });
        setFilteredProducts(newFilteredParfums);
    };

    const handleAddToCart = (product) => {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const existente = carrito.find((item) => item.id === product.id);

        if (existente) {
            existente.cantidad += 1;
        } else {
            carrito.push({ ...product, cantidad: 1 });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));

        toast.success(`${product.nombre} fue agregado al carrito 🛒`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            pauseOnHover: true,
            theme: "colored",
        });
    };

    return (
        <main className="catalogo-main">
            <h1 className="h1-catalogo">Catálogo de productos</h1>

            <section className="filtro-section">
                <label className="filtro">
                    <h3 className="h3-filtro">Precio mínimo</h3>
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        className="input-filtro"
                    />
                </label>

                <label className="filtro">
                    <h3 className="h3-filtro">Precio máximo</h3>
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="input-filtro"
                    />
                </label>

                <label>
                    <h3 className="h3-filtro">Marca</h3>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="select-filtro"
                    >
                        <option value="todos">Todos</option>
                        <option value="Carolina Herrera">Carolina Herrera</option>
                        <option value="Paco Rabanne">Paco Rabanne</option>
                        <option value="Giorgio Armani">Giorgio Armani</option>
                        <option value="Azzaro">Azzaro</option>
                        <option value="Versace">Versace</option>
                        <option value="Al Haramain">Al Haramain</option>
                        <option value="Paris Corner">Paris Corner</option>
                        <option value="Lattafa">Lattafa</option>
                        <option value="Jean Paul Gaultier">Jean Paul Gaultier</option>
                        <option value="Rasasi">Rasasi</option>
                    </select>
                </label>

                <button onClick={handleFilterClick} className="filtrar-button">
                    Aplicar filtros
                </button>
            </section>

            <section className="catalogo-container">
                {filteredProducts.map((product) => (
                    <div className="perfume02" key={product.id}>
                        <div className="perfume-card02">
                            <img
                                src={product.imagen}
                                alt={product.nombre}
                                className="product-image02"
                            />
                            <div className="perfume-card-contenido02">
                                <div className="descripcion-div02">
                                    <span className="marca02">{product.categoria}</span>
                                    <span className="descripcion02">{product.nombre}</span>
                                </div>
                                <div className="precio02">
                                    <span>${product.precio.toLocaleString("es-CL")}</span>
                                    <span>
                                        ${(product.precio + 30000).toLocaleString("es-CL")}
                                    </span>
                                </div>
                            </div>

                            <Button
                                onClick={() => handleAddToCart(product)}
                                className="addCarrito02"
                            >
                                Agregar al carrito
                            </Button>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    );
}