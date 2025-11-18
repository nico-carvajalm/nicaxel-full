
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BannerNavbar from "../src/components/BannerNavbar";
import Footer from "../src/components/Footer";

describe("Layout básico", () => {
  it("Navbar muestra links principales reales", () => {
    render(
      <MemoryRouter>
        <BannerNavbar />
      </MemoryRouter>
    );

    expect(screen.getAllByRole("link", { name: /nicaxel/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /sobre nosotros/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /blog/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /catálogo|catalogo/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /contacto/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /carrito/i }).length).toBeGreaterThan(0);
  });

  it("Footer existe (contentinfo) y renderiza contenido", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();

  });
});
