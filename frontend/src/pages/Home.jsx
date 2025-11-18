import React from "react";
import { Link, NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div>

      <main>
        <header>
          <img src="/Img/perfume02.jpg" alt="" className="header-img-01" />
          <div className="header-contenido">
            <h1>Fragancias de clase mundial</h1>
            <p>Ven y conoce cada una de nuestras líneas.</p>
            <p>
              Elegida la casa perfumera más elegante del continente por{" "}
              <strong>5 años </strong> consecutivos.
            </p>
            <Link to="/catalogo" className="header-button">
              Ver catálogo →
            </Link>
          </div>
          <img src="/Img/perfume.jpg" alt="" className="header-img-02" />
        </header>

        {/* BANNER LANZAMIENTO */}
        <section>
          <article className="banner-lanzamiento">
            <div className="banner-lanzamiento-flex">
              <img src="/Img/check.svg" alt="" />
              <div className="banner-lanzamiento-text">
                <span>Autenticidad Garantizada</span>
                <span>100% Productos Originales</span>
              </div>
            </div>
          </article>

          <article className="lanzamiento">
            <img
              src="//www.eliteperfumes.cl/cdn/shop/files/Banner_V_-ME.png?v=1756531485&amp;width=980"
              className="lanzamiento-img-01"
              alt="Banner"
            />
            <img
              srcSet="//www.eliteperfumes.cl/cdn/shop/files/Banner_H_-_ME.png?v=1756531489&amp;width=480 480w, //www.eliteperfumes.cl/cdn/shop/files/Banner_H_-_ME.png?v=1756531489&amp;width=980 980w, //www.eliteperfumes.cl/cdn/shop/files/Banner_H_-_ME.png?v=1756531489&amp;width=1200 1200w, //www.eliteperfumes.cl/cdn/shop/files/Banner_H_-_ME.png?v=1756531489&amp;width=1400 1400w, //www.eliteperfumes.cl/cdn/shop/files/Banner_H_-_ME.png?v=1756531489&amp;width=1600 1600w, //www.eliteperfumes.cl/cdn/shop/files/Banner_H_-_ME.png?v=1756531489&amp;width=1920 1920w, //www.eliteperfumes.cl/cdn/shop/files/Banner_H_-_ME.png?v=1756531489&amp;width=2560 2560w"
              className="lanzamiento-img-02"
              alt=""
            />
          </article>
        </section>

        {/* LOS MÁS VENDIDOS */}
        <section>
          <article className="mas-vendidos">
            <h3>🌟Los más vendidos</h3>
            <Link to="/catalogo">Ver catálogo completo</Link>
          </article>

          <article className="perfumes-carrusel">
            {/* PERFUME 01 */}
            <div className="perfume">
              <div className="perfume-card">
                <img src="/Img/Yara-Lattafa.jpeg" alt="Perfume Yara Lattafa" />
                <div className="perfume-card-contenido">
                  <div className="descripcion-div">
                    <span className="marca">Lattafa</span>
                    <span className="descripcion">
                      Lattafa Lattafa Yara Mujer EDP 100 ML (M)
                    </span>
                  </div>
                  <div className="rating">
                    <span>⭐⭐⭐⭐⭐</span>
                    <span>(372)</span>
                  </div>
                  <div className="precio">
                    <span>$23.740</span>
                    <span>$59.990</span>
                  </div>
                </div>
                <button className="addCarrito">Añadir al carrito</button>
              </div>
            </div>

            {/* PERFUME 02 */}
            <div className="perfume">
              <div className="perfume-card">
                <img
                  src="/Img/Versace-Eros-Flame.jpeg"
                  alt="Perfume Versace Eros Flame"
                />
                <div className="perfume-card-contenido">
                  <div className="descripcion-div">
                    <span className="marca">Lattafa</span>
                    <span className="descripcion">
                      Versace Versace Eros Flame Men EDP 100 ML (H)
                    </span>
                  </div>
                  <div className="rating">
                    <span>⭐⭐⭐⭐⭐</span>
                    <span>(36)</span>
                  </div>
                  <div className="precio">
                    <span>$59.990</span>
                    <span>$89.990</span>
                  </div>
                </div>
                <button className="addCarrito">Añadir al carrito</button>
              </div>
            </div>

                {/* PERFUME 03 */}
            <div className="perfume">
              <div className="perfume-card">
                <img
                  src="/Img/Kit-DG.jpeg"
                  alt="Perfume Versace Eros Flame"
                />
                <div className="perfume-card-contenido">
                  <div className="descripcion-div">
                    <span className="marca">Dolge & Gabbana</span>
                    <span className="descripcion">
                      Dolce & Gabbana K Pour Homme EDT Set (H)
                    </span>
                  </div>
                  <div className="rating">
                    <span>⭐⭐⭐⭐⭐</span>
                    <span>(46)</span>
                  </div>
                  <div className="precio">
                    <span>$62.990</span>
                    <span>$78.990</span>
                  </div>
                </div>
                <button className="addCarrito">Añadir al carrito</button>
              </div>
            </div>

              {/* PERFUME 04 */}
            <div className="perfume">
              <div className="perfume-card">
                <img
                  src="/Img/Nitro-Red.jpeg"
                  alt="Perfume Versace Eros Flame"
                />
                <div className="perfume-card-contenido">
                  <div className="descripcion-div">
                    <span className="marca">Elite Perfumes</span>
                    <span className="descripcion">
                      Dumont Nitro Red Pour Homme EDP 100 ML (H)
                    </span>
                  </div>
                  <div className="rating">
                    <span>⭐⭐⭐⭐</span>
                    <span>(49)</span>
                  </div>
                  <div className="precio">
                    <span>$21.690</span>
                    <span>$39.990</span>
                  </div>
                </div>
                <button className="addCarrito">Añadir al carrito</button>
              </div>
            </div>

              {/* PERFUME 05 */}
            <div className="perfume">
              <div className="perfume-card">
                <img
                  src="/Img/Eclaire-Lattafa.jpeg"
                  alt="Perfume Versace Eros Flame"
                />
                <div className="perfume-card-contenido">
                  <div className="descripcion-div">
                    <span className="marca">Lattafa</span>
                    <span className="descripcion">
                      Lattafa Lattafa Eclaire EDP 100 ML (M)
                    </span>
                  </div>
                  <div className="rating">
                    <span>⭐⭐⭐⭐⭐</span>
                    <span>(20)</span>
                  </div>
                  <div className="precio">
                    <span>$33.240</span>
                    <span>$62.370</span>
                  </div>
                </div>
                <button className="addCarrito">Añadir al carrito</button>
              </div>
            </div>
          </article>
        </section>

        
        {/* RECÍEN LLEGADOS */}
        <section>
          <article className="mas-vendidos">
            <h3>🌟Recién llegados</h3>
            <Link to="/catalogo">Ver catálogo completo</Link>
          </article>

          <article className="perfumes-carrusel">
            {/* PERFUME 01 */}
            <div className="perfume">
              <div className="perfume-card">
                <img src="/Img/Pride-Lattafa.jpeg" alt="Perfume Yara Lattafa" />
                <div className="perfume-card-contenido">
                  <div className="descripcion-div">
                    <span className="marca">Lattafa</span>
                    <span className="descripcion">
                      Lattafa Pride Art Of Universe EDP 100 ML (H)
                    </span>
                  </div>
                  <div className="rating">
                    <span>⭐⭐⭐⭐⭐</span>
                    <span>(15)</span>
                  </div>
                  <div className="precio">
                    <span>$23.740</span>
                    <span>$59.990</span>
                  </div>
                </div>
                <button className="addCarrito">Añadir al carrito</button>
              </div>
            </div>

            {/* PERFUME 02 */}
            <div className="perfume">
              <div className="perfume-card">
                <img
                  src="/Img/Hawas.jpeg"
                  alt="Perfume Versace Eros Flame"
                />
                <div className="perfume-card-contenido">
                  <div className="descripcion-div">
                    <span className="marca">Rasasi</span>
                    <span className="descripcion">
                      Rasasi Rasasi Hawas Ice For Him EDP 100 ML (H)
                    </span>
                  </div>
                  <div className="rating">
                    <span>⭐⭐⭐⭐⭐</span>
                    <span>(36)</span>
                  </div>
                  <div className="precio">
                    <span>$44.990</span>
                    <span>$69.990</span>
                  </div>
                </div>
                <button className="addCarrito">Añadir al carrito</button>
              </div>
            </div>

                {/* PERFUME 03 */}
            <div className="perfume">
              <div className="perfume-card">
                <img
                  src="/Img/Paris-Corner.jpeg"
                  alt="Perfume Versace Eros Flame"
                />
                <div className="perfume-card-contenido">
                  <div className="descripcion-div">
                    <span className="marca">Paris Corner</span>
                    <span className="descripcion">
                      Paris corner Prodigy EDP 100 ML (Hombre & Mujer
                    </span>
                  </div>
                  <div className="rating">
                    <span>⭐⭐⭐⭐</span>
                    <span>(49)</span>
                  </div>
                  <div className="precio">
                    <span>$21.690</span>
                    <span>$39.990</span>
                  </div>
                </div>
                <button className="addCarrito">Añadir al carrito</button>
              </div>
            </div>

              {/* PERFUME 04 */}
            <div className="perfume">
              <div className="perfume-card">
                <img
                  src="/Img/AcquaDiGio.jpeg"
                  alt="Perfume Versace Eros Flame"
                />
                <div className="perfume-card-contenido">
                  <div className="descripcion-div">
                    <span className="marca">Giorgo Armani</span>
                    <span className="descripcion">
                      Acqua Di Gio Parfum Recargable 75 ML Tester (H)
                    </span>
                  </div>
                  <div className="rating">
                    <span>⭐⭐⭐⭐⭐</span>
                    <span>(6)</span>
                  </div>
                  <div className="precio">
                    <span>$75.040</span>
                    <span>$106.637</span>
                  </div>
                </div>
                <button className="addCarrito">Añadir al carrito</button>
              </div>
            </div>

              {/* PERFUME 05 */}
            <div className="perfume">
              <div className="perfume-card">
                <img
                  src="/Img/Eclaire-Lattafa.jpeg"
                  alt="Perfume Versace Eros Flame"
                />
                <div className="perfume-card-contenido">
                  <div className="descripcion-div">
                    <span className="marca">Lattafa</span>
                    <span className="descripcion">
                      Lattafa Lattafa Eclaire EDP 100 ML (M)
                    </span>
                  </div>
                  <div className="rating">
                    <span>⭐⭐⭐⭐⭐</span>
                    <span>(20)</span>
                  </div>
                  <div className="precio">
                    <span>$33.240</span>
                    <span>$62.370</span>
                  </div>
                </div>
                <button className="addCarrito">Añadir al carrito</button>
              </div>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Home;
