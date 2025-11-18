import React, { useState } from "react";

const Contact = () => {

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [errorNombre, setErrorNombre] = useState("");
    const [errorCorreo, setErrorCorreo] = useState("");
    const [errorMensaje, setErrorMensaje] = useState("");
    const [contador, setContador] = useState(200);

    const handleSubmit = (e) => {
        e.preventDefault();
        let valido = true;

        if (nombre.trim().split(" ").length < 2) {
        setErrorNombre("Debes ingresar tu nombre y al menos un apellido.");
        valido = false;
        } else {
        setErrorNombre("");
        }

        if (!correo.includes("@")) {
        setErrorCorreo("Ingresa un correo válido.");
        valido = false;
        } else {
        setErrorCorreo("");
        }

        if (mensaje.trim().length === 0) {
        setErrorMensaje("El mensaje no puede estar vacío.");
        valido = false;
        } else {
        setErrorMensaje("");
        }

        if (valido) {
        alert("Formulario enviado con éxito 🎉");
        setNombre("");
        setCorreo("");
        setMensaje("");
        setContador(200);
        }
    };

    const handleMensajeChange = (e) => {
        const texto = e.target.value;
        setMensaje(texto);
        setContador(200 - texto.length);
    };

    return (
        <>
        <main className="form-main">
            <h1 className="form-h1">Contáctanos</h1>

            <section className="formulario-div">
            <h2 className="form-h2">Información requerida</h2>

            <form onSubmit={handleSubmit} id="miFormulario">
                <label htmlFor="nombre">Nombre y apellido/s*</label>
                <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Ingresa tu nombre y al menos 1 apellido"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                />
                {errorNombre && (
                <span style={{ color: "rgb(179, 56, 56)" }}>{errorNombre}</span>
                )}

                <label htmlFor="correo">Correo electrónico*</label>
                <input
                type="email"
                id="correo"
                name="correo"
                placeholder="ejemplo@gmail.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                />
                {errorCorreo && (
                <span style={{ color: "rgb(179, 56, 56)" }}>{errorCorreo}</span>
                )}

                <label htmlFor="mensaje">Mensaje (máx 200 caracteres):</label>
                <textarea
                id="mensaje"
                name="mensaje"
                placeholder="Déjanos tu mensaje aquí..."
                maxLength="200"
                rows="5"
                cols="30"
                value={mensaje}
                onChange={handleMensajeChange}
                ></textarea>
                {errorMensaje && (
                <span style={{ color: "rgb(179, 56, 56)" }}>{errorMensaje}</span>
                )}
                <p id="contador">{contador} caracteres restantes</p>

                <button type="submit">Enviar</button>
            </form>
            </section>
        </main>
        </>
    );
};

export default Contact;
