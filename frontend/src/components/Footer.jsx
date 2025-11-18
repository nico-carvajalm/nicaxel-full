import React from "react";
import { Link } from "react-router-dom";
import "../styles/main.css"; 

const Footer = () => {
    return (
        <>
                    <footer>
                        <div className="seccion-footer">
                        <h3>Horario de atención</h3>
                        <div className="footer-links">
                            <span>Lunes a Viernes: 09:00 - 20:30</span>
                            <span>Sábados, Domingos y Festivos: 11:00 - 16:30</span>
                        </div>
                        </div>
            
                        <div className="seccion-footer">
                        <h3>Catálogo</h3>
                        <div className="footer-links">
                            <span>Perfumes Árabes</span>
                            <span>Rasasi</span>
                            <span>Carolina Herrera</span>
                            <span>Paco Rabanne</span>
                            <span>Y más...!</span>
                        </div>
                        </div>
            
                        <div className="seccion-footer">
                        <h3>Sobre nosotros</h3>
                        <div className="footer-links">
                            <Link to="/nosotros">Garantías</Link>
                            <Link to="/nosotros">Métodos de pago</Link>
                            <Link to="/nosotros">Fundación</Link>
                        </div>
                        </div>
                    </footer>
            
                    <p className="licencia">
                        &copy; Diseñado y desarrollado por Axel Soto y Nicolás Carvajal.
                    </p>
        </>
    )
}

export default Footer;