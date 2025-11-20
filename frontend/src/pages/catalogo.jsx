import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 




export default function Catalogo() {
    const API_URL = import.meta.env.VITE_API_URL;

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(300000);
    const [selectedCategory, setSelectedCategory] = useState("todos");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/api/products`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch(err => console.error("Error cargando productos:", err));
    }, []);

    

    const handleFilterClick = () => {
        const newFilteredParfums = products.filter((product) => {
            const priceInRange = product.price >= minPrice && product.price <= maxPrice;
            const inSelectedCategory =
                selectedCategory === "todos" || product.brand === selectedCategory;
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

        toast.success(`${product.name} fue agregado al carrito 🛒`, {
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
                                src={product.imageUrl}
                                alt={product.name}
                                className="product-image02"
                            />

                            <div className="perfume-card-contenido02">
                                <div className="descripcion-div02">
                                    <span className="marca02">{product.brand}</span>
                                    <span className="descripcion02">{product.name}</span>
                                </div>

                                <div className="precio02">
                                    <span>${product.price.toLocaleString("es-CL")}</span>
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